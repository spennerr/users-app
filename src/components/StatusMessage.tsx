import type { ReactNode } from 'react'

type StatusMessageProps = {
  variant: 'loading' | 'error' | 'empty'
  title: string
  description?: string
  onRetry?: () => void
  action?: ReactNode
}

export function StatusMessage({
  variant,
  title,
  description,
  onRetry,
  action,
}: StatusMessageProps) {
  return (
    <div
      className={`status status--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {variant === 'loading' && (
        <span className="status__spinner" aria-hidden="true" />
      )}

      <div className="status__text">
        <h2 className="status__title">{title}</h2>
        {description && <p className="status__description">{description}</p>}
      </div>

      {onRetry && (
        <button type="button" className="button" onClick={onRetry}>
          Försök igen
        </button>
      )}
      {action}
    </div>
  )
}
