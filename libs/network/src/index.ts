'use server'
import {
  revalidatePath as nextRevalidatePath,
  revalidateTag as nextRevalidateTag,
} from 'next/cache'

export const revalidatePath = (path: string) => {
  nextRevalidatePath(path)
}
export const revalidateTag = (tag: string) => {
  nextRevalidateTag(tag)
}
