import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'

interface Props {
  children: ReactNode
  activeTab: string
  onNavigate: (tab: string) => void
  cartCount?: number
  showNav?: boolean
  showFooter?: boolean
  isAuthenticated?: boolean
  onSearchClick?: () => void
  onAuthClick?: () => void
  fullWidth?: boolean
}

export function AppLayout({
  children, activeTab, onNavigate, cartCount = 0,
  showNav = true, showFooter = true, isAuthenticated = false,
  onSearchClick, onAuthClick, fullWidth = false,
}: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {showNav && (
        <Navbar
          activeTab={activeTab}
          onNavigate={onNavigate}
          cartCount={cartCount}
          isAuthenticated={isAuthenticated}
          onSearchClick={onSearchClick}
          onAuthClick={onAuthClick}
        />
      )}

      <main className={`flex-1 w-full mx-auto ${fullWidth ? '' : 'max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8 py-6 md:py-8'}`}>
        {children}
      </main>

      {showFooter && <Footer />}

      {showNav && (
        <BottomNav
          active={activeTab}
          onNavigate={onNavigate}
          cartCount={cartCount}
        />
      )}
    </div>
  )
}
