import { Promotion } from './types'

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    restaurantId: 'r1',
    restaurantName: "Habesha 2000",
    restaurantLogo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80",
    discount: "15% OFF",
    description: "Enjoy 15% off on all main courses. Valid for dine-in and takeaway.",
    validity: "Valid until July 30, 2026",
    terms: "Minimum order of 500 ETB. Cannot be combined with other offers.",
    banner: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    cuisines: ["Ethiopian", "Traditional"],
    expiringSoon: true
  },
  {
    id: 'p2',
    restaurantId: 'r3',
    restaurantName: "Kategna",
    restaurantLogo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80",
    discount: "Combo Deal",
    description: "Get a free drink with any main dish combo. Choose from our selection of fresh juices.",
    validity: "Valid until August 15, 2026",
    terms: "Available on combo meals only. One free drink per combo.",
    banner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    cuisines: ["Ethiopian", "Fast Casual"]
  },
  {
    id: 'p3',
    restaurantId: 'r6',
    restaurantName: "Sip & Roast",
    restaurantLogo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&q=80",
    discount: "Buy 1 Get 1",
    description: "Buy any specialty coffee and get the second one free! Available for all coffee drinks.",
    validity: "Valid until July 25, 2026",
    terms: "Second coffee of equal or lesser value free. Valid on regular priced items only.",
    banner: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    cuisines: ["Café", "Bakery"],
    expiringSoon: true
  },
  {
    id: 'p4',
    restaurantId: 'r5',
    restaurantName: "Gusto Italiano",
    restaurantLogo: "https://images.unsplash.com/photo-1579751626657-72bc74c0f2e5?w=200&q=80",
    discount: "20% OFF",
    description: "20% discount on all pasta dishes this week. Taste authentic Italian flavors!",
    validity: "Valid until July 28, 2026",
    terms: "Valid on pasta dishes only. Dine-in and takeaway available.",
    banner: "https://images.unsplash.com/photo-1579751626657-72bc74c0f2e5?w=800&q=80",
    cuisines: ["Italian", "Pizza"],
    expiringSoon: true
  },
  {
    id: 'p5',
    restaurantId: 'r8',
    restaurantName: "Burger House",
    restaurantLogo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80",
    discount: "Free Fries",
    description: "Get a free large fries with any premium burger purchase. Crispy and delicious!",
    validity: "Valid until August 10, 2026",
    terms: "Valid on premium burgers only. One free fries per burger.",
    banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    cuisines: ["Fast Food", "American"]
  },
  {
    id: 'p6',
    restaurantId: 'r7',
    restaurantName: "Tibet Restaurant",
    restaurantLogo: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=80",
    discount: "Lunch Special",
    description: "Special lunch menu at only 350 ETB. Includes main dish, soup, and drink.",
    validity: "Valid weekdays 12:00 PM - 3:00 PM",
    terms: "Available for dine-in only. Set menu items as specified.",
    banner: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
    cuisines: ["Chinese", "Asian"]
  }
]
