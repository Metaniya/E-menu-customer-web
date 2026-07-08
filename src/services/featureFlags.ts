const flags = {
  enableReviews: import.meta.env.PROD,
  enablePromotions: true,
  enableCardPayment: false,
  enableOrderCancellation: true,
  enableGuestMode: true,
  enableAmharicTranslation: true,
}

export function isFeatureEnabled(key: keyof typeof flags): boolean {
  return flags[key]
}
