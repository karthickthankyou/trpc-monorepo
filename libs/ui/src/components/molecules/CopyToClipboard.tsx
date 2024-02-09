'use client'
import { Copy } from 'lucide-react'
import { useToast } from './Toaster/use-toast'

interface CopyToClipboardProps {
  text: string
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const { toast } = useToast()
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: `Text ${text} copied.` })
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 space-x-2 bg-gray-200 border rounded shadow-inner">
      <span>{text}</span>
      <button
        onClick={handleCopyClick}
        className="text-blue-500 hover:underline"
      >
        <Copy />
      </button>
    </div>
  )
}
