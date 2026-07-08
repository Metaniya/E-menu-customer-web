import { Component, ErrorInfo, ReactNode, useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UtensilsCrossed } from 'lucide-react'
import { useApp } from './providers/AppProvider'
import { AppLayout } from './layouts/AppLayout'
import { getTabForRoute } from './routes'
import { pathnameToScreen, screenToPath } from './screenRouter'
import PublicLandingPage from '../features/auth/pages/PublicLandingPage'
import AuthPage from '../features/auth/pages/AuthPage'
import EmailVerificationPage from '../features/auth/pages/EmailVerificationPage'
import PasswordResetPage from '../features/auth/pages/PasswordResetPage'
import HomePage from '../features/home/pages/HomePage'
import RestaurantListPage from '../features/home/pages/RestaurantListPage'
import SearchPage from '../features/home/pages/SearchPage'
import RestaurantDetailPage from '../features/home/pages/RestaurantDetailPage'
import MenuBrowsePage from '../features/menu/pages/MenuBrowsePage'
import ItemDetailPage from '../features/menu/pages/ItemDetailPage'
import CartPage from '../features/menu/pages/CartPage'
import CheckoutPage from '../features/menu/pages/CheckoutPage'
import QRMenuAccessPage from '../features/menu/pages/QRMenuAccessPage'
import OrderConfirmationPage from '../features/orders/pages/OrderConfirmationPage'
import OrderTrackerPage from '../features/orders/pages/OrderTrackerPage'
import OrderHistoryPage from '../features/orders/pages/OrderHistoryPage'
import ProfilePage from '../features/profile/pages/ProfilePage'
import NotificationSettingsPage from '../features/profile/pages/NotificationSettingsPage'
import FavoritesPage from '../features/profile/pages/FavoritesPage'
import RestaurantReviewsPage from '../features/social/pages/RestaurantReviewsPage'
import PromotionsPage from '../features/social/pages/PromotionsPage'
import WriteReviewModal from '../features/social/pages/WriteReviewModal'

interface Props {}
interface State { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null }

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { this.setState({ errorInfo }) }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: '#faf9f6', color: '#111', minHeight: '100vh' }}>
          <h1 style={{ color: '#ba1a1a', marginBottom: 16 }}>Runtime Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.6, maxHeight: '80vh', overflow: 'auto' }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

function AppContent() {
  const {
    currentScreen, isAuthenticated, setCurrentScreen, login, addToCart,
    updateCartItemQty, removeFromCart, placeOrder, addFavorite,
    removeFavorite, setActiveRestaurant, setActiveTable,
    getCartCount, user, orders, cart,
  } = useApp()

  const location = useLocation()
  const navigate = useNavigate()

  const [showWriteReview, setShowWriteReview] = useState(false)
  const [showEmailVerif, setShowEmailVerif] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)

  const goTo = useCallback((screen: string, params?: Record<string, string>) => {
    const path = screenToPath(screen, params)
    navigate(path)
    setCurrentScreen(screen)
  }, [navigate, setCurrentScreen])

  useEffect(() => {
    const sideEffects = { setActiveRestaurant }
    const screenFromUrl = pathnameToScreen(location.pathname, sideEffects)
    if (screenFromUrl && screenFromUrl !== currentScreen) {
      setCurrentScreen(screenFromUrl)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!isAuthenticated && currentScreen !== 'landing') {
      const timer = setTimeout(() => setShowSignUpPrompt(true), 12000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, currentScreen])

  const handleNavigate = useCallback((tab: string) => {
    if (tab === 'discover') goTo('discover')
    else if (tab === 'orders') goTo('order-history')
    else if (tab === 'favorites') goTo('favorites')
    else if (tab === 'profile') goTo('profile')
    else if (tab === 'home') goTo(isAuthenticated ? 'home' : 'landing')
    else if (tab === 'auth') goTo('auth')
    else if (tab === 'cart') goTo('cart')
    else if (tab === 'offers') goTo('promotions')
    else goTo(tab)
  }, [goTo, isAuthenticated])

  const activeTab = getTabForRoute(location.pathname)
  const cartCount = getCartCount()

  const withLayout = (page: ReactNode, opts?: { showFooter?: boolean; fullWidth?: boolean }) => (
    <AppLayout
      activeTab={activeTab}
      onNavigate={handleNavigate}
      cartCount={cartCount}
      isAuthenticated={isAuthenticated}
      onSearchClick={() => goTo('search-results')}
      onAuthClick={() => goTo('auth')}
      showFooter={opts?.showFooter !== false}
      fullWidth={opts?.fullWidth}
    >
      {page}
    </AppLayout>
  )

  const goToRestaurant = useCallback((id: string) => {
    setActiveRestaurant(id)
    goTo('restaurant-detail', { id })
  }, [setActiveRestaurant, goTo])

  if (currentScreen === 'landing') {
    return (
      <PublicLandingPage
        onNavigate={(screen) => {
          if (screen === 'auth') goTo('auth')
          else if (screen === 'discover') goTo('discover')
          else if (screen === 'promotions') goTo('promotions')
          else if (screen === 'home') goTo('home')
        }}
        onSearchClick={() => goTo('search-results')}
        onRestaurantClick={(id) => {
          setActiveRestaurant(id)
          goTo('restaurant-detail', { id })
        }}
      />
    )
  }

  if (showPasswordReset) {
    return (
      <PasswordResetPage
        onComplete={() => setShowPasswordReset(false)}
        onBack={() => setShowPasswordReset(false)}
      />
    )
  }

  if (showEmailVerif) {
    return (
      <EmailVerificationPage
        onVerified={() => { setShowEmailVerif(false); goTo('home') }}
        onBack={() => setShowEmailVerif(false)}
        onResend={() => {}}
      />
    )
  }

  const renderPage = () => {
    switch (currentScreen) {
      case 'home':
        return withLayout(
          <HomePage
            onRestaurantClick={goToRestaurant}
            onSearchClick={() => goTo('search-results')}
          />
        )
      case 'auth':
        return (
          <AuthPage
            onLogin={() => { login({ id: 'u1', name: 'Guest User', phone: '+251-91-123-4567', email: 'guest@example.com', photo: '', birthday: '', language: 'en', favorites: [], notificationPreferences: { orderUpdates: true, promotions: true, newRestaurants: false, appUpdates: true } }) }}
            onBack={() => goTo(isAuthenticated ? 'home' : 'landing')}
            onForgotPassword={() => goTo('password-reset')}
            onEmailVerification={() => goTo('email-verification')}
          />
        )
      case 'search-results':
        return withLayout(
          <SearchPage
            onRestaurantClick={goToRestaurant}
            onBack={() => goTo('home')}
          />
        )
      case 'discover':
        return withLayout(
          <RestaurantListPage
            onRestaurantClick={goToRestaurant}
            onBack={() => goTo('home')}
          />
        )
      case 'restaurant-detail':
        return (
          <RestaurantDetailPage
            onMenuClick={() => goTo('menu-browse')}
            onReviewClick={() => goTo('restaurant-reviews')}
            onBack={() => goTo('home')}
            onNavigate={handleNavigate}
            onFavoriteToggle={() => {}}
          />
        )
      case 'menu-browse':
        return (
          <MenuBrowsePage
            onItemClick={() => goTo('item-detail')}
            onCartClick={() => goTo('cart')}
            onBack={() => goTo('restaurant-detail')}
            onNavigate={handleNavigate}
          />
        )
      case 'item-detail':
        return (
          <ItemDetailPage
            onAddToCart={addToCart}
            onBack={() => goTo('menu-browse')}
          />
        )
      case 'cart':
        return (
          <CartPage
            onCheckout={() => goTo('checkout')}
            onNavigate={handleNavigate}
            onUpdateQty={updateCartItemQty}
            onRemove={removeFromCart}
          />
        )
      case 'checkout':
        return (
          <CheckoutPage
            onPlaceOrder={(pm) => { placeOrder(pm); goTo('order-confirmation') }}
            onBack={() => goTo('cart')}
          />
        )
      case 'qr-access':
        return (
          <QRMenuAccessPage
            onRedirect={() => goTo('menu-browse')}
            onError={() => goTo('discover')}
          />
        )
      case 'order-confirmation':
        return withLayout(
          <OrderConfirmationPage
            onViewOrder={() => goTo('order-tracker')}
            onBackToHome={() => goTo('home')}
          />,
          { showFooter: false }
        )
      case 'order-tracker':
        return (
          <OrderTrackerPage
            onBack={() => goTo('order-history')}
          />
        )
      case 'order-history':
        return withLayout(
          <OrderHistoryPage
            onOrderClick={() => goTo('order-tracker')}
            onNavigate={handleNavigate}
          />
        )
      case 'profile':
        return (
          <ProfilePage
            onNavigate={handleNavigate}
            onEdit={() => goTo('account-settings')}
            onFavorites={() => goTo('favorites')}
            onSettings={() => goTo('notification-settings')}
          />
        )
      case 'account-settings':
        return withLayout(
          <NotificationSettingsPage
            onBack={() => goTo('profile')}
          />
        )
      case 'notification-settings':
        return withLayout(
          <NotificationSettingsPage
            onBack={() => goTo('profile')}
          />
        )
      case 'favorites':
        return (
          <FavoritesPage
            onRestaurantClick={goToRestaurant}
          />
        )
      case 'restaurant-reviews':
        return (
          <RestaurantReviewsPage
            onBack={() => goTo('restaurant-detail')}
          />
        )
      case 'promotions':
        return withLayout(
          <PromotionsPage
            onPromotionClick={() => {}}
            onNavigate={handleNavigate}
          />
        )
      default:
        return withLayout(
          <HomePage
            onRestaurantClick={goToRestaurant}
            onSearchClick={() => goTo('search-results')}
          />
        )
    }
  }

  return (
    <>
      {renderPage()}
      {showWriteReview && (
        <WriteReviewModal
          restaurantName="Restaurant"
          onSubmit={(text, photos) => {
            setShowWriteReview(false)
          }}
          onClose={() => setShowWriteReview(false)}
        />
      )}
      {showSignUpPrompt && !isAuthenticated && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-[fade-in_0.2s_ease-out]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowSignUpPrompt(false)} />
          <div className="relative w-full max-w-sm bg-card rounded-3xl shadow-2xl overflow-hidden animate-[zoom-in_0.3s_ease-out]">
            <div className="relative bg-gradient-to-br from-primary/90 via-primary to-primary/80 px-6 pt-10 pb-12 text-center overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
                <UtensilsCrossed size={30} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">Join E-MENU</h3>
              <p className="text-sm text-primary-foreground/80 max-w-xs mx-auto">Create an account to unlock the full dining experience</p>
            </div>
            <div className="px-6 pt-5 pb-6 space-y-1">
              {[
                'Save your favorite restaurants',
                'Track orders in real-time',
                'Get exclusive offers & discounts',
                'Reorder with one tap',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 space-y-2.5">
              <button onClick={() => { setShowSignUpPrompt(false); goTo('auth') }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]">Create Free Account</button>
              <button onClick={() => { setShowSignUpPrompt(false); goTo('auth') }} className="w-full py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-all active:scale-[0.98]">I already have an account</button>
              <button onClick={() => setShowSignUpPrompt(false)} className="w-full py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Continue as guest</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}
