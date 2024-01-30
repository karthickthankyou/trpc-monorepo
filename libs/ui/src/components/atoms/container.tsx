import { BaseComponent } from '../../util/types'

export const Container = ({ children, className }: BaseComponent) => (
  <div className={`container px-1 mx-auto ${className}`}>{children}</div>
)
