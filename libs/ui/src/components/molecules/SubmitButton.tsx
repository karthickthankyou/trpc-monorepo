'use client'

import { useFormStatus } from 'react-dom'
import { BaseComponent } from '../../util/types'
import { Button } from '../atoms/button'

export const SubmitButton = ({
  children = 'Submit',
  className,
}: BaseComponent) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className={className}>
      {pending ? 'Loading...' : children}
    </Button>
  )
}
