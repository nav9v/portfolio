'use client'

import { useTheme } from 'next-themes'
import { Icons } from '~/components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      try {
        document.startViewTransition(() => setTheme(newTheme))
      } catch {
        setTheme(newTheme)
      }
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className='rounded-full p-[10px] hover:bg-accent'
          data-umami-event={'toggle-theme'}
          onClick={() => {
            toggleTheme()
          }}
        >
          <Icons.sun className='size-full text-neutral-800 dark:hidden dark:text-neutral-200' />
          <Icons.moon className='hidden size-full text-neutral-800 dark:block dark:text-neutral-200' />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{resolvedTheme === 'light' ? 'Light' : 'Dark'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
