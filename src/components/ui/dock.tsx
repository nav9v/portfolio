/* eslint-disable*/
// @ts-nocheck

"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import React, { type PropsWithChildren, useRef } from "react"

import { cn } from "~/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  magnification?: number
  distance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] sm:h-[58px] h-[48px] w-max gap-1 sm:gap-2 rounded-2xl border p-1 sm:p-2 backdrop-blur-md",
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity)

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  },
)

Dock.displayName = "Dock"

export interface DockIconProps {
  size?: number
  magnification?: number
  distance?: number
  // eslint-disable-next-line
  mouseX?: any
  className?: string
  children?: React.ReactNode
  // eslint-disable-next-line
  props?: PropsWithChildren
}

const DockIcon = ({
  // eslint-disable-next-line
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  // Make icons smaller on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const minSize = isMobile ? 32 : 40
  const maxSize = isMobile ? Math.min(magnification, 50) : magnification

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [minSize, maxSize, minSize],
  )

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
