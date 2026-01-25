# S3 Website Module Variables

variable "bucket_name" {
  description = "Name of the S3 bucket for static website hosting"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$", var.bucket_name))
    error_message = "Bucket name must be between 3 and 63 characters, lowercase, and can contain only letters, numbers, hyphens, and periods."
  }
}

variable "application_name" {
  description = "Name of the application for tagging purposes"
  type        = string
  default     = "coding-drills"
}

variable "force_destroy" {
  description = "Allow destruction of bucket even if it contains objects"
  type        = bool
  default     = false
}

variable "enable_versioning" {
  description = "Enable S3 bucket versioning for rollback capability"
  type        = bool
  default     = true
}

variable "enable_lifecycle_rules" {
  description = "Enable lifecycle rules for cost optimization"
  type        = bool
  default     = true
}

variable "noncurrent_version_retention_days" {
  description = "Number of days to retain noncurrent object versions"
  type        = number
  default     = 30

  validation {
    condition     = var.noncurrent_version_retention_days >= 1 && var.noncurrent_version_retention_days <= 365
    error_message = "Retention days must be between 1 and 365."
  }
}

variable "cors_allowed_origins" {
  description = "List of allowed origins for CORS configuration"
  type        = list(string)
  default     = ["*"]
}

variable "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution for bucket policy"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Additional tags to apply to resources"
  type        = map(string)
  default     = {}
}
