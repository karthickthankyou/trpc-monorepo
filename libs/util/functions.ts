import { format as dateFnsFormat } from 'date-fns'
export const focusOnErrorPath = (errorPath?: string | number) => {
  if (!errorPath) {
    return
  }

  const inputElement = document.getElementsByName(
    errorPath.toString(),
  )[0] as HTMLInputElement

  if (inputElement) {
    inputElement.focus()
  }
}

export const format = (date: string, shape = 'PPp') => {
  return dateFnsFormat(new Date(date), shape)
}
