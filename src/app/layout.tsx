import { Inter as FontSans } from 'next/font/google'
import { Suspense } from 'react'
import { Analytics } from '~/components/analytics'
import { ConditionalNavbar } from '~/components/conditional-navbar'
import { ThemeProvider } from '~/components/theme/provider'
import { TooltipProvider } from '~/components/ui/tooltip'
import { DATA } from '~/config'
import { cn } from '~/lib/utils'

import '~/styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  metadataBase: new URL(DATA.url),
  icons: [{ rel: 'icon', url: '/favicon.png' }],
  title: {
    default: DATA.name + ' | ' + DATA.slogan,
    template: `%s | ${DATA.name + ' | ' + DATA.slogan}`,
  },
  description: DATA.description,
  openGraph: {
    title: DATA.name + ' | ' + DATA.slogan,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: 'en',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: DATA.name + ' | ' + DATA.slogan,
    card: 'summary_large_image',
    description: DATA.description,
    images: ['/twitter-image.png'],
    creator: '@nav9v',
  },
  verification: {
    google: '',
    yandex: '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            {children}
            <Suspense fallback={null}>
              <ConditionalNavbar />
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
