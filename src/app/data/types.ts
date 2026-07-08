export interface Restaurant {
  id: string
  name: string
  cuisine: string[]
  priceRange: string
  distance: string
  deliveryTime: string
  isOpen: boolean
  cover: string
  logo: string
  description: string
  hours: string
  phone: string
  address: string
  lat: number
  lng: number
  suspended?: boolean
  promoted?: boolean
  images: string[]
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  nameAm: string
  category: string
  price: number
  description: string
  descriptionAm: string
  image: string
  tags: string[]
  popular?: boolean
  available?: boolean
  spicyLevel?: number
  allergens?: string[]
  customizations?: CustomizationGroup[]
}

export interface CustomizationGroup {
  name: string
  type: 'single' | 'multiple'
  required: boolean
  options: CustomizationOption[]
}

export interface CustomizationOption {
  name: string
  price: number
}

export interface CartItem extends MenuItem {
  quantity: number
  selectedCustomizations?: Record<string, string[]>
  specialInstructions?: string
}

export interface Order {
  id: string
  restaurantId: string
  restaurantName: string
  restaurantLogo: string
  tableNumber?: string
  items: CartItem[]
  subtotal: number
  serviceFee: number
  total: number
  status: 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  paymentMethod: string
  createdAt: string
  updatedAt: string
  estimatedTime: number
}

export interface UserProfile {
  id: string
  name: string
  phone: string
  email: string
  photo: string
  birthday: string
  language: 'en' | 'am'
  favorites: string[]
  notificationPreferences: {
    orderUpdates: boolean
    promotions: boolean
    newRestaurants: boolean
    appUpdates: boolean
  }
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  restaurantId: string
  text: string
  photos: string[]
  createdAt: string
  helpful: number
}

export interface Promotion {
  id: string
  restaurantId: string
  restaurantName: string
  restaurantLogo: string
  discount: string
  description: string
  validity: string
  terms: string
  banner: string
  cuisines: string[]
  expiringSoon?: boolean
}

export interface Location {
  lat: number
  lng: number
  address: string
  area: string
}
