import { pathnameToScreen } from './screenRouter'

export type ScreenRoute =
  | 'splash'
  | 'landing'
  | 'auth'
  | 'email-verification'
  | 'password-reset'
  | 'discover'
  | 'restaurant-detail'
  | 'search-results'
  | 'filter-modal'
  | 'menu-browse'
  | 'item-detail'
  | 'cart'
  | 'checkout'
  | 'qr-access'
  | 'order-confirmation'
  | 'order-tracker'
  | 'order-history'
  | 'profile'
  | 'account-settings'
  | 'favorites'
  | 'write-review'
  | 'restaurant-reviews'
  | 'promotions'

export const TAB_ROUTES = ['home', 'discover', 'orders', 'favorites', 'profile'] as const
export type TabRoute = typeof TAB_ROUTES[number]

export function isTabRoute(route: string): route is TabRoute {
  return TAB_ROUTES.includes(route as TabRoute)
}

export function getTabForRoute(route: string): string {
  const screen = route.startsWith('/') ? pathnameToScreen(route) : route
  const r = screen || route
  if (r === 'home' || r === 'landing') return 'home'
  if (r === 'discover' || r === 'search-results' || r === 'filter-modal' || r === 'restaurant-detail') return 'discover'
  if (r === 'menu-browse' || r === 'item-detail' || r === 'cart' || r === 'checkout' || r === 'qr-access') return 'discover'
  if (r === 'order-tracker' || r === 'order-confirmation') return 'orders'
  if (r === 'profile' || r === 'account-settings') return 'profile'
  if (r === 'favorites') return 'favorites'
  if (r === 'orders') return 'orders'
  if (r === 'write-review' || r === 'restaurant-reviews') return 'home'
  if (r === 'promotions') return 'offers'
  return 'home'
}
