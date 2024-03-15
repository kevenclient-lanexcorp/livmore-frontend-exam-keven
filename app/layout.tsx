import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import AppContext from '@/app/contexts/app'
import Header from '@/app/components/header'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ViciniaPtyLtd',
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (<html lang="en">
  <body className={inter.className}>
    <AppContext>
      <AntdRegistry>
        <Header/>
        {children}
      </AntdRegistry>
    </AppContext>
  </body>
</html>)

export default Layout
