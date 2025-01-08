import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useState } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  label?: string
  className?: string
}

export function TagInput({ value, onChange, placeholder = 'Type and use space to add tags', label, className }: TagInputProps) {
  const [tagInput, setTagInput] = useState('')

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const lastChar = inputValue[inputValue.length - 1]

    if (lastChar === ' ') {
      const newTag = inputValue.trim()
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag])
      }
      setTagInput('')
    } else {
      setTagInput(inputValue)
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !tagInput) {
      e.preventDefault()
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className={cn('space-y-2.5', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      )}
      <div className="flex flex-wrap gap-2 p-2 min-h-[42px] w-full bg-secondary border border-input rounded-lg focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-colors">
        {value.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-tertiary text-secondary-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X size={14} className="hover:text-muted-foreground" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleTagKeyDown}
          className="flex-1 w-full !p-0 !bg-transparent !border-0 !shadow-none text-sm outline-none placeholder:text-muted-foreground"
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>
    </div>
  )
}
