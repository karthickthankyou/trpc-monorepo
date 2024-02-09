'use client'
import { BaseComponent, FormState } from '@foundation-trpc/util/types'
import { useFormState } from 'react-dom'
import { SubmitButton } from './SubmitButton'
import { DisplayErrors } from './DisplayError'
import { useEffect, useRef } from 'react'
import { useToast } from './Toaster/use-toast'

export interface IFormProps extends BaseComponent {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  submitButtonText?: string
}

export const Form = ({ action, submitButtonText, children }: IFormProps) => {
  const [state, formAction] = useFormState(action, { data: null, error: null })
  const ref = useRef<HTMLFormElement | null>(null)

  const { toast } = useToast()
  useEffect(() => {
    if (state.data) {
      ref.current?.reset()
      toast({ title: state.data })
    }
  }, [state, toast])

  return (
    <form ref={ref} action={formAction} className="space-y-2">
      {children}
      {state.error ? <DisplayErrors errors={state.error} /> : null}
      <SubmitButton className="w-full">{submitButtonText}</SubmitButton>
    </form>
  )
}
