// components/Layout.tsx
'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import  SideBar from './components/SideBar/SideBar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  
  // Страницы где не показываем сайдбар
  const hideSidebarPages = ['/auth/login', '/auth/register']
  const shouldHideSidebar = hideSidebarPages.includes(pathname)

  if (shouldHideSidebar) {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  )
}