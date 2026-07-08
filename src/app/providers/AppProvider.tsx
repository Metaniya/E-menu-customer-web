import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CartItem, Order, UserProfile, Location, Review, Promotion } from '../../shared/types'
import { RESTAURANTS } from '../../features/home/data/restaurants'
import { PROMOTIONS } from '../../features/home/data/promotions'

interface AppState {
  isAuthenticated: boolean
  isFirstTime: boolean
  user: UserProfile | null
  currentScreen: string
  cart: CartItem[]
  orders: Order[]
  favorites: string[]
  location: Location | null
  locationPermission: 'granted' | 'denied' | 'undetermined'
  notificationPermission: 'granted' | 'denied' | 'undetermined'
  language: 'en' | 'am'
  activeRestaurantId: string | null
  activeTableNumber: string | null
  reviews: Review[]
  promotions: Promotion[]
  onboardingComplete: boolean
}

interface AppContextType extends AppState {
  login: (user: UserProfile) => void
  logout: () => void
  completeOnboarding: () => void
  setLanguage: (lang: 'en' | 'am') => void
  setLocation: (loc: Location) => void
  setLocationPermission: (status: 'granted' | 'denied') => void
  setNotificationPermission: (status: 'granted' | 'denied') => void
  addToCart: (item: CartItem) => void
  updateCartItemQty: (itemId: string, delta: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  updateSpecialInstructions: (itemId: string, instructions: string) => void
  placeOrder: (paymentMethod: string) => Order
  addFavorite: (restaurantId: string) => void
  removeFavorite: (restaurantId: string) => void
  setActiveRestaurant: (id: string | null) => void
  setActiveTable: (table: string | null) => void
  getCartTotal: () => { subtotal: number; serviceFee: number; total: number }
  getCartCount: () => number
  setCurrentScreen: (screen: string) => void
}

const defaultUser: UserProfile = {
  id: 'u1', name: 'John Doe', phone: '+251-91-123-4567', email: 'john@example.com', photo: '', birthday: '', language: 'en',
  favorites: ['r1', 'r3'],
  notificationPreferences: { orderUpdates: true, promotions: true, newRestaurants: false, appUpdates: true },
}

const defaultLocation: Location = { lat: 9.0222, lng: 38.7468, address: 'Bole Road, Addis Ababa', area: 'Bole' }

const sampleReviews: Review[] = [
  { id: 'rev1', userId: 'u2', userName: 'Sara T.', userAvatar: '', restaurantId: 'r1', text: 'The Doro Wat was absolutely incredible! Rich flavors and perfectly spiced.', photos: [], createdAt: '2026-06-28T14:30:00Z', helpful: 12 },
  { id: 'rev2', userId: 'u3', userName: 'Mekdes A.', userAvatar: '', restaurantId: 'r1', text: 'Great food and fast service. The kitfo was fresh and delicious.', photos: [], createdAt: '2026-06-25T10:15:00Z', helpful: 8 },
  { id: 'rev3', userId: 'u4', userName: 'Biruk H.', userAvatar: '', restaurantId: 'r5', text: 'Best pizza in Addis! The margherita tastes just like Italy.', photos: [], createdAt: '2026-06-20T19:45:00Z', helpful: 15 },
  { id: 'rev4', userId: 'u5', userName: 'Hanna W.', userAvatar: '', restaurantId: 'r9', text: 'The tonkotsu ramen is out of this world. Rich broth, perfect noodles.', photos: [], createdAt: '2026-07-01T13:00:00Z', helpful: 22 },
  { id: 'rev5', userId: 'u6', userName: 'Yonas D.', userAvatar: '', restaurantId: 'r12', text: 'Butter chicken was creamy and flavorful. Garlic naan was perfect.', photos: [], createdAt: '2026-07-02T19:30:00Z', helpful: 6 },
  { id: 'rev6', userId: 'u7', userName: 'Selam K.', userAvatar: '', restaurantId: 'r11', text: 'The Buddha Bowl is my go-to healthy lunch. Fresh ingredients!', photos: [], createdAt: '2026-06-30T12:15:00Z', helpful: 10 },
]

const initialState: AppState = {
  isAuthenticated: false, isFirstTime: true, user: null, currentScreen: 'landing',
  cart: [], orders: [], favorites: [], location: defaultLocation,
  locationPermission: 'granted', notificationPermission: 'granted', language: 'en',
  activeRestaurantId: null, activeTableNumber: null, reviews: sampleReviews,
  promotions: PROMOTIONS, onboardingComplete: false,
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)
  const update = (partial: Partial<AppState>) => setState(prev => ({ ...prev, ...partial }))

  const login = useCallback((user: UserProfile) => update({ isAuthenticated: true, user, currentScreen: 'home', onboardingComplete: true, isFirstTime: false, favorites: user.favorites }), [])
  const logout = useCallback(() => update({ isAuthenticated: false, user: null, cart: [], currentScreen: 'splash' }), [])
  const completeOnboarding = useCallback(() => update({ onboardingComplete: true, isFirstTime: false }), [])
  const setLanguage = useCallback((language: 'en' | 'am') => update({ language }), [])
  const setLocation = useCallback((location: Location) => update({ location }), [])
  const setLocationPermission = useCallback((locationPermission: 'granted' | 'denied') => update({ locationPermission }), [])
  const setNotificationPermission = useCallback((notificationPermission: 'granted' | 'denied') => update({ notificationPermission }), [])
  const setCurrentScreen = useCallback((currentScreen: string) => update({ currentScreen }), [])

  const addToCart = useCallback((item: CartItem) => {
    setState(prev => {
      const existing = prev.cart.find(i => i.id === item.id && JSON.stringify(i.selectedCustomizations) === JSON.stringify(item.selectedCustomizations))
      if (existing) return { ...prev, cart: prev.cart.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i) }
      return { ...prev, cart: [...prev.cart, item] }
    })
  }, [])

  const updateCartItemQty = useCallback((itemId: string, delta: number) => {
    setState(prev => ({ ...prev, cart: prev.cart.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i) }))
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setState(prev => ({ ...prev, cart: prev.cart.filter(i => i.id !== itemId) }))
  }, [])

  const clearCart = useCallback(() => setState(prev => ({ ...prev, cart: [] })), [])
  const updateSpecialInstructions = useCallback((itemId: string, instructions: string) => {
    setState(prev => ({ ...prev, cart: prev.cart.map(i => i.id === itemId ? { ...i, specialInstructions: instructions } : i) }))
  }, [])

  const placeOrder = useCallback((paymentMethod: string): Order => {
    const { subtotal, serviceFee, total } = getCartTotal()
    const order: Order = {
      id: `EM-${String(10000 + Math.floor(Math.random() * 90000))}`,
      restaurantId: state.activeRestaurantId || 'r1',
      restaurantName: RESTAURANTS.find(r => r.id === state.activeRestaurantId)?.name || '',
      restaurantLogo: RESTAURANTS.find(r => r.id === state.activeRestaurantId)?.logo || '',
      tableNumber: state.activeTableNumber || undefined,
      items: [...state.cart], subtotal, serviceFee, total,
      status: 'received', paymentMethod,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), estimatedTime: 15,
    }
    setState(prev => ({ ...prev, orders: [order, ...prev.orders], cart: [] }))
    return order
  }, [state.cart, state.activeRestaurantId, state.activeTableNumber])

  const addFavorite = useCallback((restaurantId: string) => {
    setState(prev => ({ ...prev, favorites: [...new Set([...prev.favorites, restaurantId])] }))
  }, [])
  const removeFavorite = useCallback((restaurantId: string) => {
    setState(prev => ({ ...prev, favorites: prev.favorites.filter(f => f !== restaurantId) }))
  }, [])
  const setActiveRestaurant = useCallback((activeRestaurantId: string | null) => update({ activeRestaurantId }), [])
  const setActiveTable = useCallback((activeTableNumber: string | null) => update({ activeTableNumber }), [])

  const getCartTotal = useCallback(() => {
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { subtotal, serviceFee: Math.round(subtotal * 0.05), total: subtotal + Math.round(subtotal * 0.05) }
  }, [state.cart])
  const getCartCount = useCallback(() => state.cart.reduce((sum, item) => sum + item.quantity, 0), [state.cart])

  const value: AppContextType = {
    ...state, login, logout, completeOnboarding, setLanguage, setLocation,
    setLocationPermission, setNotificationPermission,
    addToCart, updateCartItemQty, removeFromCart, clearCart, updateSpecialInstructions, placeOrder,
    addFavorite, removeFavorite, setActiveRestaurant, setActiveTable, getCartTotal, getCartCount, setCurrentScreen,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
