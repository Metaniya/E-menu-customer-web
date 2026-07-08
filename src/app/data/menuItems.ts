import { MenuItem } from './types'

export const MENU_CATEGORIES = ["All", "Starters", "Mains", "Injera & Breads", "Beverages", "Desserts"]

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    restaurantId: 'r1',
    name: "Doro Wat",
    nameAm: "ዶሮ ወጥ",
    category: "Mains",
    price: 450,
    description: "Spicy chicken stew simmered with berbere spice, served with injera and hard-boiled eggs.",
    descriptionAm: "ዶሮ በበርበሬ ቅመም የተቀቀለ፣ ከእንጀራ እና የተቀቀለ እንቁላል ጋር የሚቀርብ።",
    image: "https://images.unsplash.com/photo-1586999768265-24af89630739?w=600&q=80",
    tags: ["Spicy", "Halal", "Popular"],
    popular: true,
    spicyLevel: 3,
    allergens: ["Eggs"],
    customizations: [
      {
        name: "Spice Level",
        type: "single",
        required: true,
        options: [{ name: "Mild", price: 0 }, { name: "Medium", price: 0 }, { name: "Hot", price: 0 }]
      },
      {
        name: "Extra Toppings",
        type: "multiple",
        required: false,
        options: [{ name: "Extra Egg", price: 50 }, { name: "Extra Chicken", price: 150 }]
      }
    ]
  },
  {
    id: 'm2',
    restaurantId: 'r1',
    name: "Kitfo",
    nameAm: "ክትፎ",
    category: "Starters",
    price: 350,
    description: "Traditional Ethiopian minced raw beef seasoned with mitmita and clarified butter, served with cottage cheese.",
    descriptionAm: "ትኩስ የበሬ ሥጋ በሚጥሚጣ እና በቅቤ የተቀመመ፣ ከአይብ ጋር የሚቀርብ።",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    tags: ["Traditional", "Halal"],
    spicyLevel: 2,
    customizations: [
      {
        name: "Temperature",
        type: "single",
        required: true,
        options: [{ name: "Raw (Tire)", price: 0 }, { name: "Medium (Leyb)", price: 0 }, { name: "Cooked (Yebes)", price: 0 }]
      }
    ]
  },
  {
    id: 'm3',
    restaurantId: 'r1',
    name: "Injera",
    nameAm: "እንጀራ",
    category: "Injera & Breads",
    price: 80,
    description: "Traditional Ethiopian spongy flatbread made from teff flour. Served with every meal.",
    descriptionAm: "ከጤፍ ዱቄት የሚሰራ ባህላዊ የኢትዮጵያ እንጀራ።",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
    tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    popular: true,
  },
  {
    id: 'm4',
    restaurantId: 'r1',
    name: "Ethiopian Coffee",
    nameAm: "ቡና",
    category: "Beverages",
    price: 60,
    description: "Traditional Ethiopian coffee ceremony style. Freshly roasted and brewed to perfection.",
    descriptionAm: "ባህላዊ የኢትዮጵያ ቡና። አዲስ የተጠበሰ እና የተቀመመ።",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    tags: ["Traditional", "Popular"],
    popular: true,
    customizations: [
      {
        name: "Sweetness",
        type: "single",
        required: false,
        options: [{ name: "No Sugar", price: 0 }, { name: "Little Sugar", price: 0 }, { name: "Regular", price: 0 }, { name: "Sweet", price: 0 }]
      }
    ]
  },
  {
    id: 'm5',
    restaurantId: 'r1',
    name: "Tibs",
    nameAm: "ጥብስ",
    category: "Mains",
    price: 380,
    description: "Sautéed meat with onions, peppers, and traditional herbs. Served with injera or bread.",
    descriptionAm: "በሽንኩርት፣ በቃሪያ እና በቅመማ ቅመም የተጠበሰ ሥጋ።",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    tags: ["Halal", "Popular"],
    popular: true,
    spicyLevel: 2,
    customizations: [
      {
        name: "Meat Type",
        type: "single",
        required: true,
        options: [{ name: "Beef", price: 0 }, { name: "Lamb", price: 0 }, { name: "Chicken", price: 0 }]
      }
    ]
  },
  {
    id: 'm6',
    restaurantId: 'r5',
    name: "Margherita Pizza",
    nameAm: "ማርጋሪታ ፒዛ",
    category: "Mains",
    price: 550,
    description: "Classic wood-fired pizza with fresh mozzarella, tomato sauce, and basil.",
    descriptionAm: "ትኩስ ሞዛሬላ፣ የቲማቲም ሶስ እና ባሲል ያለው እንጨት ላይ የተጋገረ ፒዛ።",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    tags: ["Vegetarian", "Popular"],
    popular: true,
    customizations: [
      {
        name: "Size",
        type: "single",
        required: true,
        options: [{ name: "Small (10\")", price: 0 }, { name: "Medium (12\")", price: 150 }, { name: "Large (16\")", price: 350 }]
      },
      {
        name: "Extra Toppings",
        type: "multiple",
        required: false,
        options: [{ name: "Extra Cheese", price: 100 }, { name: "Mushrooms", price: 80 }, { name: "Pepperoni", price: 120 }]
      }
    ]
  },
  {
    id: 'm7',
    restaurantId: 'r5',
    name: "Pasta Carbonara",
    nameAm: "ፓስታ ካርቦናራ",
    category: "Mains",
    price: 480,
    description: "Spaghetti with creamy egg sauce, pancetta, and parmesan cheese.",
    descriptionAm: "እንቁላል ሶስ፣ ፓንቼታ እና ፓርሜሳን አይብ ያለው ስፓጌቲ።",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
    tags: ["Popular"],
    customizations: [
      {
        name: "Extra",
        type: "multiple",
        required: false,
        options: [{ name: "Extra Cheese", price: 80 }, { name: "Mushrooms", price: 70 }, { name: "Grilled Chicken", price: 150 }]
      }
    ]
  },
  {
    id: 'm8',
    restaurantId: 'r6',
    name: "Cappuccino",
    nameAm: "ካፑቺኖ",
    category: "Beverages",
    price: 120,
    description: "Rich espresso with steamed milk foam, dusted with cocoa powder.",
    descriptionAm: "ጠንካራ ኢስፕሬሶ ከወተት አረፋ እና ኮኮዋ ጋር።",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    tags: ["Vegetarian"],
    popular: true,
    customizations: [
      {
        name: "Milk Type",
        type: "single",
        required: false,
        options: [{ name: "Whole Milk", price: 0 }, { name: "Oat Milk", price: 30 }, { name: "Soy Milk", price: 30 }]
      },
      {
        name: "Size",
        type: "single",
        required: true,
        options: [{ name: "Small", price: 0 }, { name: "Medium", price: 30 }, { name: "Large", price: 60 }]
      }
    ]
  },
  {
    id: 'm9',
    restaurantId: 'r6',
    name: "Croissant",
    nameAm: "ክሮሳንት",
    category: "Desserts",
    price: 150,
    description: "Buttery, flaky French croissant baked fresh every morning.",
    descriptionAm: "በቅቤ የተዘጋጀ እና ትኩስ የተጋገረ የፈረንሳይ ክሮሳንት።",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    tags: ["Vegetarian"],
  },
  {
    id: 'm10',
    restaurantId: 'r3',
    name: "Shiro",
    nameAm: "ሽሮ",
    category: "Mains",
    price: 180,
    description: "Creamy chickpea or lentil stew, slow-cooked with berbere and garlic. Served with injera.",
    descriptionAm: "ከሽምብራ ወይም ምስር የተሰራ ለስላሳ ወጥ፣ ከእንጀራ ጋር የሚቀርብ።",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
    tags: ["Vegetarian", "Vegan", "Halal", "Popular"],
    popular: true,
    spicyLevel: 1,
    customizations: [
      {
        name: "Extra",
        type: "multiple",
        required: false,
        options: [{ name: "Extra Berbere", price: 20 }, { name: "With Meat", price: 100 }]
      }
    ]
  },
  {
    id: 'm11',
    restaurantId: 'r3',
    name: "Firfir",
    nameAm: "ፍርፍር",
    category: "Mains",
    price: 200,
    description: "Shredded injera soaked in spicy berbere sauce, served with yogurt or cottage cheese.",
    descriptionAm: "የተቆረጠ እንጀራ በበርበሬ ውስጥ የተቀባ፣ ከእርጎ ወይም አይብ ጋር የሚቀርብ።",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
    tags: ["Vegetarian", "Halal"],
    spicyLevel: 2,
    customizations: [
      {
        name: "With",
        type: "single",
        required: false,
        options: [{ name: "Yogurt", price: 30 }, { name: "Cottage Cheese", price: 40 }]
      }
    ]
  },
  {
    id: 'm12',
    restaurantId: 'r8',
    name: "Classic Burger",
    nameAm: "ክላሲክ በርገር",
    category: "Mains",
    price: 320,
    description: "Juicy beef patty with lettuce, tomato, cheese, and our secret sauce in a brioche bun.",
    descriptionAm: "ከበሬ ሥጋ፣ ሰላጣ፣ ቲማቲም፣ አይብ እና ልዩ ሶስ ጋር የተዘጋጀ በርገር።",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    tags: ["Halal", "Popular"],
    popular: true,
    customizations: [
      {
        name: "Doneness",
        type: "single",
        required: true,
        options: [{ name: "Medium Rare", price: 0 }, { name: "Medium", price: 0 }, { name: "Well Done", price: 0 }]
      },
      {
        name: "Extras",
        type: "multiple",
        required: false,
        options: [{ name: "Extra Cheese", price: 50 }, { name: "Bacon", price: 80 }, { name: "Fried Egg", price: 40 }, { name: "Avocado", price: 70 }]
      }
    ]
  },
  {
    id: 'm13',
    restaurantId: 'r7',
    name: "Kung Pao Chicken",
    nameAm: "ኩንግ ፓኦ ዶሮ",
    category: "Mains",
    price: 420,
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
    descriptionAm: "ዶሮ ከኦቾሎኒ፣ አትክልት እና ቃሪያ ጋር የተጠበሰ።",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    tags: ["Spicy", "Popular"],
    spicyLevel: 3,
    customizations: [
      {
        name: "Spice Level",
        type: "single",
        required: true,
        options: [{ name: "Mild", price: 0 }, { name: "Medium", price: 0 }, { name: "Hot", price: 0 }]
      }
    ]
  },
  {
    id: 'm14',
    restaurantId: 'r2',
    name: "Enkulal Tibs",
    nameAm: "እንቁላል ጥብስ",
    category: "Mains",
    price: 250,
    description: "Scrambled eggs sautéed with onions, tomatoes, and traditional spices. Served with fresh bread.",
    descriptionAm: "እንቁላል ከሽንኩርት፣ ቲማቲም እና ቅመማ ቅመም ጋር የተጠበሰ።",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
    tags: ["Vegetarian", "Halal"],
  },
  {
    id: 'm15',
    restaurantId: 'r2',
    name: "Fruit Juice",
    nameAm: "የፍራፍሬ ጭማቂ",
    category: "Beverages",
    price: 90,
    description: "Freshly squeezed fruit juice. Choice of mango, papaya, avocado, or mixed.",
    descriptionAm: "ትኩስ የተጨመቀ የፍራፍሬ ጭማቂ።",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80",
    tags: ["Vegetarian", "Vegan"],
    popular: true,
    customizations: [
      {
        name: "Flavor",
        type: "single",
        required: true,
        options: [{ name: "Mango", price: 0 }, { name: "Papaya", price: 0 }, { name: "Avocado", price: 30 }, { name: "Mixed", price: 0 }]
      }
    ]
  },
  {
    id: 'm16',
    restaurantId: 'r4',
    name: "Special Kitfo",
    nameAm: "ልዩ ክትፎ",
    category: "Mains",
    price: 520,
    description: "Premium minced beef with spiced butter, served with homemade cottage cheese and fresh injera.",
    descriptionAm: "ከፍተኛ ጥራት ያለው የበሬ ሥጋ በቅቤ የተቀመመ፣ ከቤት አይብ እና ትኩስ እንጀራ ጋር።",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    tags: ["Traditional", "Popular"],
    popular: true,
    spicyLevel: 2,
  }
]

export const SPECIAL_OFFERS = [
  { code: "WELCOME20", discount: 20, type: "percentage", minOrder: 200, maxDiscount: 150 },
  { code: "FIRSTORDER", discount: 50, type: "flat", minOrder: 300 },
]

export const SERVICE_FEE_RATE = 0.05
export const DELIVERY_FEE = 80
