'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ModeToggle } from '~/components/theme/toggle'
import { Dock, DockIcon } from '~/components/ui/dock'
import { Separator } from '~/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { DATA } from '~/config'

export type IconProps = React.HTMLAttributes<SVGElement>

export function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY.current
      setScrollPosition((prev) => {
        const newPosition = Math.max(Math.min(prev + diff, 90), 0)
        return newPosition
      })
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background' />
      <div
        className='fixed bottom-4 sm:bottom-8 transition-transform duration-200'
        style={
          {
            '--scroll-offset': `${scrollPosition}px`,
            transform: 'translateY(var(--scroll-offset))'
          } as React.CSSProperties
        }
      >
        <Dock
          magnification={isMobile ? 45 : 60}
          distance={isMobile ? 60 : 100}
          className='rounded-r-full rounded-l-full bg-white px-2 sm:px-5 dark:bg-black'
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href} >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className='rounded-full p-[6px] sm:p-[10px] hover:bg-accent'
                    href={item.href}
                    data-umami-event={'navbar-' + item.label}
                    {...(item.href.startsWith('http') ? { target: '_blank' } : {})}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
                      {item.icon}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator
            orientation='vertical'
            className='h-full'
          />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className='rounded-full p-[6px] sm:p-[10px] hover:bg-accent'
                      href={social.url}
                      data-umami-event={'navbar-' + social.name}
                      target='_blank'
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {social.icon}
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator
            orientation='vertical'
            className='h-full'
          />
          <DockIcon>
            <div className="scale-75 sm:scale-100">
              <ModeToggle />
            </div>
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}
