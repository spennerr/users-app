import type { ReactNode } from 'react'

interface StatusMessageProps {
  variant: 'loading' | 'error' | 'empty'
  title: string
  description?: string
  action?: ReactNode
}

export function StatusMessage({
  variant,
  title,
  description,
  action,
}: StatusMessageProps) {
  return (
    <div className={`status status--${variant}`} role="status" aria-live="polite">
      {variant === 'loading' && (
        <span className="status__spinner" aria-hidden="true" />
      )}
      <div className="status__text">
        <h2 className="status__title">{title}</h2>
        {description && <p className="status__description">{description}</p>}
      </div>
      {action}
    </div>
  )
}