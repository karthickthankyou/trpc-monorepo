import { format } from 'date-fns'
import { cn } from '../../util'

export interface IDisplayDateProps {
  dateString: string
  dateFormat?: string
  className?: string
}

export const DisplayDate = ({
  dateString,
  dateFormat = 'PPp',
  className,
}: IDisplayDateProps) => {
  return (
    <div className={cn('text-xs text-gray-600', className)}>
      {format(dateString, dateFormat)}
    </div>
  )
}
