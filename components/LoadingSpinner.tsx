'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'error';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

const variantClasses = {
  default: 'border-gray-600 border-t-gray-300',
  primary: 'border-purple-900/30 border-t-purple-500',
  success: 'border-emerald-900/30 border-t-emerald-500',
  error: 'border-red-900/30 border-t-red-500',
};

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full
        animate-spin
        ${className}
      `}
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
