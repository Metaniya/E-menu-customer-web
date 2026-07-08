# E-MENU PLATFORM
## CUSTOMER MENU PWA - SCREEN INVENTORY & FLOW

**Document Version:** 2.0  
**Prepared By:** Pitron Tech Solutions PLC  
**Date:** June 2026  
**Interface:** Customer-Facing Progressive Web App (Responsive)

---

## COMPLETE SCREEN INVENTORY - CUSTOMER PWA

**Total Screens:** 15  
**Must-Have (Phase 1):** 12 screens  
**Should-Have (Phase 2):** 3 screens  

---

## SCREEN COUNT BY PHASE

### **PHASE 1: CORE CUSTOMER EXPERIENCE** - 12 Screens

| Phase | Category | Screen Count | Screen IDs |
|-------|----------|--------------|------------|
| **1A** | QR Entry & Menu Browsing | 5 | CM-01, CM-02, CM-03, CM-14, CM-15 |
| **1B** | Ordering Flow | 4 | CM-05, CM-06, CM-07, CM-12 |
| **1C** | Restaurant Discovery | 3 | CM-08, CM-09, CM-10 |

### **PHASE 2: ENHANCED FEATURES** - 3 Screens

| Phase | Category | Screen Count | Screen IDs |
|-------|----------|--------------|------------|
| **2A** | Search & Personalization | 3 | CM-04, CM-11, CM-13 |

---

## PHASE 1: CORE CUSTOMER EXPERIENCE (12 SCREENS)

### Phase 1A: QR Entry & Menu Browsing (5 Screens)

| # | Screen ID | Screen Name | Priority | Mobile (360-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|---|-----------|-------------|----------|-------------------|--------------------|--------------------|
| 1 | **CM-01** | **Restaurant Landing Page** | Must Have | Full-screen hero, stacked layout | Hero 50% height, content centered | Hero 60vh, centered card max-width 1200px |
| 2 | **CM-02** | **Menu Browse (Main)** | Must Have | Single column items, sticky tabs | 2-column grid, sticky header | 3-column grid with fixed category sidebar |
| 3 | **CM-03** | **Item Detail Modal** | Must Have | Full-screen modal | Bottom sheet 80% height | Centered modal max-width 800px |
| 4 | **CM-14** | **Loading States (Skeleton)** | Must Have | Vertical skeleton cards | 2-column skeleton grid | 3-column skeleton grid |
| 5 | **CM-15** | **Network Error Screen** | Must Have | Full-screen error message | Centered error card | Centered error card max-width 600px |

---

### Phase 1B: Ordering Flow (4 Screens)

| # | Screen ID | Screen Name | Priority | Mobile (360-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|---|-----------|-------------|----------|-------------------|--------------------|--------------------|
| 6 | **CM-05** | **Cart Review & Checkout** | Must Have | Full-screen stacked items | 2-column layout, summary sidebar | Centered max-width 800px, summary right |
| 7 | **CM-06** | **Order Confirmation** | Must Have | Full-screen success card | Centered card 70% width | Centered card max-width 600px |
| 8 | **CM-07** | **Order Status Tracker** | Must Have | Vertical status timeline | Horizontal progress bar + details | Horizontal stepper, order summary sidebar |
| 9 | **CM-12** | **Empty Cart State** | Must Have | Full-screen empty state | Centered empty state 60% width | Centered empty state max-width 500px |

---

### Phase 1C: Restaurant Discovery (3 Screens)

| # | Screen ID | Screen Name | Priority | Mobile (360-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|---|-----------|-------------|----------|-------------------|--------------------|--------------------|
| 10 | **CM-09** | **Restaurant Discovery Home** | Must Have | Single column list | 2-column grid | 3-column grid with filter sidebar |
| 11 | **CM-10** | **Restaurant Card (List Item)** | Must Have | Full-width card component | Card in 2-column grid | Card in 3-column grid |
| 12 | **CM-08** | **Service Unavailable** | Must Have | Full-screen message | Centered card 70% width | Centered card max-width 600px |

---

## PHASE 2: ENHANCED FEATURES (3 SCREENS)

### Phase 2A: Search & Personalization (3 Screens)

| # | Screen ID | Screen Name | Priority | Mobile (360-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|---|-----------|-------------|----------|-------------------|--------------------|--------------------|
| 13 | **CM-04** | **Search & Filter Overlay** | Should Have | Full-screen overlay | Right sidebar 400px | Right sidebar 400px |
| 14 | **CM-11** | **Restaurant Profile Page** | Should Have | Stacked sections | 2-column layout | Hero section + 2-column details |
| 15 | **CM-13** | **No Results / Empty State** | Should Have | Full-screen empty state | Centered empty state 60% width | Centered empty state max-width 500px |

---

## COMPLETE USER FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CUSTOMER PWA - COMPLETE USER FLOWS                    │
│                           Total Screens: 15                              │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
FLOW 1: QR SCAN TO ORDER (PRIMARY PATH) - Phase 1A + 1B
═══════════════════════════════════════════════════════════════════════════

                        [Customer Scans QR Code at Table]
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │      CM-01 (1A)         │
                        │   Restaurant Landing    │
                        │   • Hero image          │
                        │   • Welcome message     │
                        │   • Language toggle     │
                        │   • "View Menu" CTA     │
                        └────────────┬────────────┘
                                     │
                         Tap "View Menu" Button
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      CM-14 (1A)         │◄───── Shows while
                        │   Loading Skeleton      │      loading menu
                        │   • Category skeletons  │
                        │   • Item card skeletons │
                        └────────────┬────────────┘
                                     │
                              Data loads successfully
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      CM-02 (1A)         │
                        │    Menu Browse Main     │
                        │   • Category tabs       │
                        │   • Item grid/list      │
                        │   • Search icon         │
                        │   • Cart icon (badge)   │
                        └────────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
          Network error?    Tap item card    Tap search (Phase 2)
                    │                │                │
                    ▼                ▼                ▼
         ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
         │   CM-15 (1A)    │  │   CM-03 (1A)    │  │   CM-04 (2A)    │
         │ Network Error   │  │  Item Detail    │  │  Search Filter  │
         │ • Error icon    │  │  • Large photo  │  │  • Search bar   │
         │ • Retry button  │  │  • Description  │  │  • Filters      │
         └────────┬────────┘  │  • Price        │  │  • Results      │
                  │           │  • Qty selector │  └─────────────────┘
           Tap "Retry"        │  • Add to Cart  │         │
                  │           └────────┬────────┘         │
                  │                    │                  │
                  └────────────────────┼──────────────────┘
                                       │
                              Tap "Add to Cart"
                                (Repeat for multiple items)
                                       │
                                       ▼
                        ┌─────────────────────────┐
                        │   Cart Icon in Header   │
                        │    Shows item count     │
                        └────────────┬────────────┘
                                     │
                              Tap Cart Icon
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
              Cart is empty?                    Cart has items?
                    │                                 │
                    ▼                                 ▼
         ┌─────────────────┐           ┌─────────────────────────┐
         │   CM-12 (1B)    │           │      CM-05 (1B)         │
         │  Empty Cart     │           │  Cart Review Checkout   │
         │  • Empty icon   │           │  • Item list            │
         │  • Message      │           │  • Quantities           │
         │  • Browse Menu  │           │  • Special requests     │
         └────────┬────────┘           │  • Subtotal             │
                  │                    │  • "Submit Order" CTA   │
         Tap "Browse Menu"             └────────────┬────────────┘
                  │                                 │
                  │                         Tap "Submit Order"
                  │                                 │
                  └────────────────┬────────────────┘
                                   │
                                   ▼
                                [Back to CM-02]
                                                    │
                                             Order processing
                                                    │
                                                    ▼
                                   ┌─────────────────────────┐
                                   │      CM-06 (1B)         │
                                   │  Order Confirmation     │
                                   │  • Success icon         │
                                   │  • Order # (EM-XXXXX)   │
                                   │  • Table number         │
                                   │  • Timestamp            │
                                   │  • "Track Order" button │
                                   └────────────┬────────────┘
                                                │
                                      Tap "Track Order Status"
                                                │
                                                ▼
                                   ┌─────────────────────────┐
                                   │      CM-07 (1B)         │
                                   │   Order Status Tracker  │
                                   │  • Progress indicator   │
                                   │    □ Received           │
                                   │    □ Preparing          │
                                   │    □ Ready              │
                                   │    □ Served             │
                                   │  • Auto-refresh (10s)   │
                                   │  • Order summary        │
                                   └─────────────────────────┘
                                           (Terminal state)


═══════════════════════════════════════════════════════════════════════════
FLOW 2: RESTAURANT DISCOVERY (BROWSING WITHOUT QR) - Phase 1C
═══════════════════════════════════════════════════════════════════════════

                    [Customer Opens E-MENU Website Directly]
                     (No QR scan, just browsing restaurants)
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │      CM-09 (1C)         │
                        │  Restaurant Discovery   │
                        │  • Search bar           │
                        │  • Filter chips         │
                        │    (Location, Cuisine)  │
                        │  • Restaurant cards     │
                        └────────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
            User searches/    Tap restaurant    No results?
                 filters           card              │
                    │                │                │
                    └────────────────┤                │
                                     │                ▼
                                     │      ┌─────────────────┐
                                     │      │   CM-13 (2A)    │
                                     │      │   No Results    │
                                     │      │  • Empty icon   │
                                     │      │  • Clear filter │
                                     │      └─────────────────┘
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      CM-10 (1C)         │
                        │   Restaurant Card       │
                        │   (Component in list)   │
                        │  • Restaurant logo      │
                        │  • Name                 │
                        │  • Cuisine tags         │
                        │  • Price range (₪₪)     │
                        │  • Location             │
                        │  • Open/Closed badge    │
                        └────────────┬────────────┘
                                     │
                              Tap on card
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
         Optional Profile View (Phase 2)    Direct to menu (Phase 1)
                    │                                 │
                    ▼                                 │
         ┌─────────────────┐                         │
         │   CM-11 (2A)    │                         │
         │   Restaurant    │                         │
         │     Profile     │                         │
         │  • Cover photo  │                         │
         │  • Description  │                         │
         │  • Hours        │                         │
         │  • Location map │                         │
         │  • "View Menu"  │                         │
         └────────┬────────┘                         │
                  │                                  │
           Tap "View Menu"                           │
                  │                                  │
                  └──────────────┬───────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      CM-01 (1A)         │
                    │   Restaurant Landing    │
                    └────────────┬────────────┘
                                 │
                                 │
                    [Joins Flow 1 at "View Menu" step]


═══════════════════════════════════════════════════════════════════════════
FLOW 3: SUSPENDED RESTAURANT ERROR HANDLING - Phase 1C
═══════════════════════════════════════════════════════════════════════════

                        [Customer Scans QR Code]
                                 │
                                 │
                    Backend checks subscription status
                                 │
                                 │
                     Subscription is SUSPENDED/EXPIRED
                                 │
                                 ▼
                        ┌─────────────────────────┐
                        │      CM-08 (1C)         │
                        │   Service Unavailable   │
                        │  • Friendly icon        │
                        │  • Explanation message  │
                        │    (EN/AM)              │
                        │  • "Browse Other        │
                        │     Restaurants" button │
                        └────────────┬────────────┘
                                     │
                        Tap "Browse Other Restaurants"
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      CM-09 (1C)         │
                        │  Restaurant Discovery   │
                        └─────────────────────────┘
                                     │
                                     │
                    [Joins Flow 2 - Discovery Path]


═══════════════════════════════════════════════════════════════════════════
FLOW 4: ENHANCED SEARCH & FILTERING (PHASE 2 OPTIONAL) - Phase 2A
═══════════════════════════════════════════════════════════════════════════

                    [From CM-02 Menu Browse Screen]
                                 │
                                 │
                        Tap Search Icon in Header
                                 │
                                 ▼
                        ┌─────────────────────────┐
                        │      CM-04 (2A)         │
                        │   Search & Filter       │
                        │  • Search input         │
                        │  • Filter sections:     │
                        │    - Dietary (Vegan,    │
                        │      Halal, etc.)       │
                        │    - Price range        │
                        │    - Spice level        │
                        │    - Category filter    │
                        │  • Active filter chips  │
                        │  • Real-time results    │
                        └────────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
            User types query   Applies filters   Results found?
                    │                │                │
                    └────────────────┤                │
                                     │                ▼
                              Results update    ┌─────────────────┐
                                     │          │   CM-13 (2A)    │
                                     │          │  No Results     │
                                     │          │  • Empty state  │
                                     │          │  • Suggestions  │
                                     │          │  • Clear filter │
                                     │          └─────────┬───────┘
                                     │                    │
                                     │         Tap "Clear All Filters"
                                     │                    │
                                     ▼                    │
                        Filtered items display            │
                           in CM-02 view                  │
                                     │                    │
                                     └────────────────────┘
                                     │
                              Tap item to view
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      CM-03 (1A)         │
                        │    Item Detail Modal    │
                        └─────────────────────────┘
                                     │
                                     │
                        [Continues with Flow 1 ordering]


═══════════════════════════════════════════════════════════════════════════
ERROR & EDGE CASE FLOWS (GLOBAL)
═══════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────┐
│ NETWORK ERROR (Can occur on any screen)                 │
└──────────────────────────────────────────────────────────┘

    [Any screen making API request]
                │
                │
    Network timeout / Connection lost
                │
                ▼
    ┌─────────────────────────┐
    │      CM-15 (1A)         │
    │   Network Error Screen  │
    │  • Error illustration   │
    │  • Message (EN/AM)      │
    │  • "Retry" button       │
    │  • Offline indicator    │
    └────────────┬────────────┘
                 │
          Tap "Retry"
                 │
                 ▼
    [Attempts to reload previous screen]
                 │
         ┌───────┴───────┐
         │               │
    Successful       Still failing
         │               │
         ▼               ▼
    [Returns to    [Shows CM-15
     previous       again with
     screen]        updated message]


┌──────────────────────────────────────────────────────────┐
│ LOADING STATES (Shown during data fetch)                │
└──────────────────────────────────────────────────────────┘

    [User navigates to data-heavy screen]
                │
                │ (CM-02, CM-09, etc.)
                │
                ▼
    ┌─────────────────────────┐
    │      CM-14 (1A)         │
    │   Loading Skeleton      │
    │  • Skeleton cards       │
    │  • Animated pulse       │
    │  • Matches target layout│
    └────────────┬────────────┘
                 │
          Data received
                 │
                 ▼
    [Content fades in, replaces skeleton]
```

---

## SCREEN COUNT SUMMARY BY CATEGORY

| Category | Phase 1 | Phase 2 | Total |
|----------|---------|---------|-------|
| **Entry & Browsing** | 5 | 1 | 6 |
| **Ordering** | 4 | 0 | 4 |
| **Discovery** | 3 | 1 | 4 |
| **Search & Filter** | 0 | 1 | 1 |
| **Total** | **12** | **3** | **15** |

---

## SCREEN DEPENDENCIES MAP

```
┌─────────────────────────────────────────────────────────────┐
│                    SCREEN DEPENDENCIES                       │
└─────────────────────────────────────────────────────────────┘

INDEPENDENT SCREENS (Entry Points):
├─ CM-01 (Restaurant Landing) ◄── QR Code scan
├─ CM-09 (Restaurant Discovery) ◄── Direct website visit
└─ CM-08 (Service Unavailable) ◄── Suspended restaurant QR

DEPENDENT SCREENS (Require Navigation):
├─ CM-02 (Menu Browse)
│   ├─ Depends on: CM-01
│   └─ Triggers: CM-03, CM-04, CM-05, CM-14, CM-15
│
├─ CM-03 (Item Detail Modal)
│   ├─ Depends on: CM-02 or CM-04
│   └─ Triggers: Return to CM-02 or open CM-05
│
├─ CM-04 (Search & Filter) [Phase 2]
│   ├─ Depends on: CM-02
│   └─ Triggers: CM-03, CM-13
│
├─ CM-05 (Cart Review)
│   ├─ Depends on: Items in cart
│   └─ Triggers: CM-06 or shows CM-12 if empty
│
├─ CM-06 (Order Confirmation)
│   ├─ Depends on: CM-05 submission
│   └─ Triggers: CM-07
│
├─ CM-07 (Order Status Tracker)
│   ├─ Depends on: CM-06 order submission
│   └─ Terminal screen (auto-refreshes)
│
├─ CM-10 (Restaurant Card)
│   ├─ Component used in: CM-09
│   └─ Triggers: CM-01 or CM-11
│
├─ CM-11 (Restaurant Profile) [Phase 2]
│   ├─ Depends on: CM-10 selection
│   └─ Triggers: CM-01
│
├─ CM-12 (Empty Cart State)
│   ├─ Depends on: Empty cart condition
│   └─ Triggers: Return to CM-02
│
├─ CM-13 (No Results State) [Phase 2]
│   ├─ Depends on: CM-04 search with 0 results
│   └─ Triggers: Clear filters → return to CM-04
│
└─ CM-14, CM-15 (Loading/Error States)
    └─ Can appear globally during any data fetch
```

---

## PHASE-BASED DEVELOPMENT ROADMAP

### **SPRINT 1: CORE BROWSING** (Weeks 1-2) - Phase 1A
**Screens:** 5  
**Build Order:**
1. CM-14 (Loading Skeleton) - Build first as it's reusable
2. CM-15 (Network Error) - Build second for error handling
3. CM-01 (Restaurant Landing) - Entry point
4. CM-02 (Menu Browse) - Core functionality
5. CM-03 (Item Detail Modal) - Complete browsing flow

**Testing Focus:**
- QR code scanning integration
- Language toggle persistence
- 3G network performance
- Image lazy loading

---

### **SPRINT 2: ORDERING FLOW** (Weeks 3-4) - Phase 1B
**Screens:** 4  
**Build Order:**
1. CM-12 (Empty Cart State) - Simple, sets up cart logic
2. CM-05 (Cart Review) - Core ordering screen
3. CM-06 (Order Confirmation) - Post-submission
4. CM-07 (Order Status Tracker) - Real-time updates

**Testing Focus:**
- Cart state management
- Order submission API
- Order number generation
- Status polling/WebSocket

---

### **SPRINT 3: DISCOVERY** (Weeks 5-6) - Phase 1C
**Screens:** 3  
**Build Order:**
1. CM-10 (Restaurant Card Component) - Reusable component
2. CM-09 (Restaurant Discovery) - List view using CM-10
3. CM-08 (Service Unavailable) - Error handling

**Testing Focus:**
- Restaurant listing performance
- Search and filter (basic)
- Subscription status checks
- Navigation between discovery and menu

---

### **SPRINT 4: ENHANCEMENTS** (Weeks 7-8) - Phase 2A (OPTIONAL)
**Screens:** 3  
**Build Order:**
1. CM-13 (No Results State) - Simple empty state
2. CM-04 (Search & Filter) - Complex filtering logic
3. CM-11 (Restaurant Profile) - Detailed view

**Testing Focus:**
- Advanced filter combinations
- Search performance
- Profile page data accuracy
- Analytics tracking (if implemented)

---

## CRITICAL PATH ANALYSIS

### **Minimum Viable Product (MVP):**
**8 Screens Required for Basic Functionality**

```
CRITICAL PATH (Must Have for Launch):
┌────────────────────────────────────────┐
│ CM-01 (Restaurant Landing)             │ ◄── Entry
│ CM-02 (Menu Browse)                    │ ◄── Core
│ CM-03 (Item Detail Modal)              │ ◄── Core
│ CM-05 (Cart Review)                    │ ◄── Core
│ CM-06 (Order Confirmation)             │ ◄── Core
│ CM-14 (Loading States)                 │ ◄── UX
│ CM-15 (Network Error)                  │ ◄── UX
│ CM-07 (Order Status) OR Simple Success│ ◄── Nice-to-have
└────────────────────────────────────────┘
```

**Can be deferred to post-MVP:**
- CM-07 (Order Status Tracker) - Can use simple success message initially
- CM-08 (Service Unavailable) - Can show generic error
- CM-09, CM-10 (Discovery) - Not needed if only using QR codes
- CM-12 (Empty Cart) - Can show simple message
- All Phase 2 screens

---

## SCREEN INTERACTION MATRIX

| From Screen | Possible Next Screens | Navigation Type |
|-------------|----------------------|-----------------|
| **CM-01** | CM-02, CM-15 | Button tap, error |
| **CM-02** | CM-03, CM-04, CM-05, CM-12, CM-14, CM-15 | Tap item, tap search, tap cart |
| **CM-03** | CM-02, CM-05 | Close modal, add to cart |
| **CM-04** | CM-03, CM-13, CM-02 | Select item, no results, close |
| **CM-05** | CM-06, CM-02 | Submit order, continue shopping |
| **CM-06** | CM-07 | Tap track order |
| **CM-07** | (Terminal) | Auto-refresh only |
| **CM-08** | CM-09 | Tap browse button |
| **CM-09** | CM-01, CM-10, CM-11, CM-13 | Select restaurant, no results |
| **CM-10** | CM-01, CM-11 | Tap card |
| **CM-11** | CM-01 | Tap view menu |
| **CM-12** | CM-02 | Tap browse menu |
| **CM-13** | CM-04 | Clear filters |
| **CM-14** | (Replaces with content) | Automatic |
| **CM-15** | (Previous screen) | Tap retry |

---

## RESPONSIVE BREAKPOINT SUMMARY

### **Mobile First Approach**

| Screen | Mobile (Base) | Tablet (768px+) | Desktop (1024px+) |
|--------|---------------|-----------------|-------------------|
| **CM-01** | Stacked | Hero image larger | Max-width constrained |
| **CM-02** | 1 column | 2 columns | 3 columns + sidebar |
| **CM-03** | Full screen | 80% modal | 800px modal |
| **CM-04** | Full screen | Right sidebar | Right sidebar |
| **CM-05** | Stacked | Side-by-side | Summary sidebar |
| **CM-06** | Full screen | Centered card | Centered card |
| **CM-07** | Vertical | Horizontal | Horizontal + sidebar |
| **CM-08** | Full screen | Centered card | Centered card |
| **CM-09** | 1 column | 2 columns | 3 columns + filters |
| **CM-10** | Full width | Card in grid | Card in grid |
| **CM-11** | Stacked | 2 columns | Hero + 2 columns |
| **CM-12** | Full screen | Centered | Centered |
| **CM-13** | Full screen | Centered | Centered |
| **CM-14** | 1 column | 2 columns | 3 columns |
| **CM-15** | Full screen | Centered | Centered |

---

## PERFORMANCE BUDGET BY SCREEN

| Screen | Initial Load (3G) | Time to Interactive | Image Budget |
|--------|------------------|---------------------|--------------|
| **CM-01** | <3s | <4s | Hero: 150KB |
| **CM-02** | <2s | <3s | Per item: 30KB |
| **CM-03** | <1.5s | <2s | Detail: 200KB |
| **CM-05** | <1s | <1.5s | Thumbnails: 20KB |
| **CM-06** | <0.5s | <1s | None |
| **CM-07** | <1s | <1.5s | None |
| **CM-09** | <2.5s | <3.5s | Per logo: 15KB |
| **CM-11** | <2s | <3s | Cover: 150KB |

---

## NEXT STEPS FOR IMPLEMENTATION

### **Week 1: Setup & Design**
- [ ] Finalize color scheme and typography
- [ ] Create component library (buttons, cards, inputs)
- [ ] Set up React/Next.js project
- [ ] Configure Tailwind CSS
- [ ] Design high-fidelity mockups for Sprint 1 screens

### **Week 2-3: Sprint 1 (Phase 1A)**
- [ ] Build CM-14 (skeleton loader component)
- [ ] Build CM-15 (error handling component)
- [ ] Build CM-01 (landing page)
- [ ] Build CM-02 (menu browse with category tabs)
- [ ] Build CM-03 (item detail modal)
- [ ] QR code integration testing

### **Week 4-5: Sprint 2 (Phase 1B)**
- [ ] Build CM-12 (empty cart)
- [ ] Build CM-05 (cart review)
- [ ] Build CM-06 (confirmation)
- [ ] Build CM-07 (status tracker)
- [ ] End-to-end order flow testing

### **Week 6-7: Sprint 3 (Phase 1C)**
- [ ] Build CM-10 (restaurant card component)
- [ ] Build CM-09 (discovery home)
- [ ] Build CM-08 (service unavailable)
- [ ] Integration testing with suspended restaurants

### **Week 8-9: Sprint 4 (Phase 2A) - OPTIONAL**
- [ ] Build CM-13 (no results state)
- [ ] Build CM-04 (search & filter)
- [ ] Build CM-11 (restaurant profile)
- [ ] User acceptance testing

### **Week 10: Polish & Launch**
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] PWA features (offline, install prompt)
- [ ] Production deployment

---

**END OF CUSTOMER PWA SCREEN SPECIFICATION**