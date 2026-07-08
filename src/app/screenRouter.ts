import { matchPath } from 'react-router'
import type { AppContextType } from './context/AppContext'

const SCREEN_TO_PATH: Record<string, string> = {
  landing: '/',
  auth: '/auth',
  'email-verification': '/auth/verify-email',
  'password-reset': '/auth/reset-password',
  home: '/home',
  discover: '/discover',
  'search-results': '/search',
  'restaurant-detail': '/restaurant/:id',
  'menu-browse': '/restaurant/:id/menu',
  'item-detail': '/menu/:itemId',
  cart: '/cart',
  checkout: '/checkout',
  'qr-access': '/qr',
  'order-history': '/orders',
  'order-tracker': '/orders/:id/track',
  'order-confirmation': '/orders/:id/confirmation',
  profile: '/profile',
  'account-settings': '/profile/edit',
  'notification-settings': '/profile/notifications',
  favorites: '/favorites',
  'restaurant-reviews': '/restaurant/:id/reviews',
  promotions: '/offers',
}

export function screenToPath(screen: string, params?: Record<string, string>): string {
  let path = SCREEN_TO_PATH[screen]
  if (!path) return '/'
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value)
    }
  }
  return path
}

type SyncSideEffects = {
  setActiveRestaurant?: (id: string) => void
}

export function pathnameToScreen(pathname: string, sideEffects?: SyncSideEffects): string | null {
  for (const [screen, pattern] of Object.entries(SCREEN_TO_PATH)) {
    const match = matchPath(pattern, pathname)
    if (match) {
      if (sideEffects?.setActiveRestaurant && match.params.id && screen === 'restaurant-detail') {
        sideEffects.setActiveRestaurant(match.params.id)
      }
      return screen
    }
  }
  return null
}
