# CloudFront Distribution Module
# Provisions a CloudFront distribution optimized for Next.js static sites
# with proper caching, security headers, and SSL configuration

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

# Origin Access Control for secure S3 access
resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "${var.application_name}-oac"
  description                       = "OAC for ${var.application_name} S3 origin"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Cache policy optimized for Next.js static assets
resource "aws_cloudfront_cache_policy" "nextjs_static" {
  name        = "${var.application_name}-nextjs-static-cache"
  comment     = "Cache policy for Next.js static assets"
  default_ttl = 86400    # 1 day
  max_ttl     = 31536000 # 1 year
  min_ttl     = 1

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

# Cache policy for HTML pages (shorter TTL for faster updates)
resource "aws_cloudfront_cache_policy" "nextjs_pages" {
  name        = "${var.application_name}-nextjs-pages-cache"
  comment     = "Cache policy for Next.js HTML pages"
  default_ttl = 0
  max_ttl     = 3600 # 1 hour
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "all"
    }
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}

# Response headers policy with security headers
resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name    = "${var.application_name}-security-headers"
  comment = "Security headers for ${var.application_name}"

  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    content_security_policy {
      content_security_policy = var.content_security_policy
      override                = true
    }
  }

  custom_headers_config {
    items {
      header   = "X-Application"
      value    = var.application_name
      override = true
    }
    items {
      header   = "X-Environment"
      value    = var.environment
      override = true
    }
  }
}

# CloudFront Function for URL rewriting (SPA routing)
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.application_name}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "URL rewrite for Next.js static export SPA routing"
  publish = true

  code = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // Check if URI has a file extension
      if (uri.includes('.')) {
        return request;
      }

      // Check for Next.js static paths
      if (uri.startsWith('/_next/')) {
        return request;
      }

      // For paths without extensions, try to serve the corresponding HTML file
      if (!uri.endsWith('/')) {
        // Try adding .html extension
        request.uri = uri + '.html';
      } else {
        // For directory paths, serve index.html
        request.uri = uri + 'index.html';
      }

      return request;
    }
  EOF
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.application_name} - ${var.environment}"
  default_root_object = "index.html"
  price_class         = var.price_class
  aliases             = var.domain_names
  http_version        = "http2and3"

  origin {
    domain_name              = var.s3_bucket_regional_domain_name
    origin_id                = "S3-${var.application_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
  }

  # Default behavior for HTML pages
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.application_name}"

    cache_policy_id            = aws_cloudfront_cache_policy.nextjs_pages.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }
  }

  # Ordered cache behavior for Next.js static assets (long cache)
  ordered_cache_behavior {
    path_pattern     = "_next/static/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.application_name}"

    cache_policy_id            = aws_cloudfront_cache_policy.nextjs_static.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  # Cache behavior for static assets in public folder
  ordered_cache_behavior {
    path_pattern     = "*.ico"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.application_name}"

    cache_policy_id            = aws_cloudfront_cache_policy.nextjs_static.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  ordered_cache_behavior {
    path_pattern     = "*.svg"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.application_name}"

    cache_policy_id            = aws_cloudfront_cache_policy.nextjs_static.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  # Custom error responses for SPA routing
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = var.geo_restriction_type
      locations        = var.geo_restriction_locations
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.acm_certificate_arn != "" ? var.acm_certificate_arn : null
    cloudfront_default_certificate = var.acm_certificate_arn == ""
    minimum_protocol_version       = var.acm_certificate_arn != "" ? "TLSv1.2_2021" : null
    ssl_support_method             = var.acm_certificate_arn != "" ? "sni-only" : null
  }

  logging_config {
    include_cookies = false
    bucket          = var.logging_bucket != "" ? var.logging_bucket : null
    prefix          = var.logging_bucket != "" ? "${var.application_name}/${var.environment}/" : null
  }

  tags = merge(var.tags, {
    Name        = "${var.application_name}-cdn"
    Environment = var.environment
    Application = var.application_name
  })

  lifecycle {
    precondition {
      condition     = length(var.domain_names) == 0 || var.acm_certificate_arn != ""
      error_message = "ACM certificate ARN is required when using custom domain names."
    }
  }
}
