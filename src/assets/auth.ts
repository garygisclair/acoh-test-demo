// Figma-exported assets for the Auth flow, served from /public/assets/auth/.
// BASE_URL resolves to '/acoh-test-demo/' in both dev and GitHub Pages builds.
const base = import.meta.env.BASE_URL

export const HEART_LOGO = `${base}assets/auth/logo-heart.svg`
export const SPLASH_ILLUSTRATION = `${base}assets/auth/splash-illustration.png`

export const WELCOME_ILLUSTRATIONS = [
  `${base}assets/auth/welcome-1.png`,
  `${base}assets/auth/welcome-2.png`,
  `${base}assets/auth/welcome-3.png`,
  `${base}assets/auth/welcome-4.png`,
  `${base}assets/auth/welcome-5.png`,
] as const

export const GOOGLE_LOGO = `${base}assets/auth/google-logo.svg`
export const APPLE_LOGO = `${base}assets/auth/apple-logo.svg`

export const CROWN = `${base}assets/auth/crown.svg`
export const SIGNIN_AVATAR = `${base}assets/auth/signin-avatar.png`
export const PARTNER_AVATAR = `${base}assets/auth/partner-avatar.png`
export const LOVEBIRDS = `${base}assets/auth/lovebirds.svg`

// Splash decorative elements — sparkles + florals around the couple illustration
export const SPARKLE_BURST_LEFT = `${base}assets/auth/sparkle-burst-left.svg`
export const SPARKLE_BURST_RIGHT = `${base}assets/auth/sparkle-burst-right.svg`
export const SPARKLE_TINY = `${base}assets/auth/sparkle-tiny.svg`
export const SPARKLE_MID_1 = `${base}assets/auth/sparkle-mid-1.svg`
export const SPARKLE_MID_2 = `${base}assets/auth/sparkle-mid-2.svg`
export const SPARKLE_MID_3 = `${base}assets/auth/sparkle-mid-3.svg`
export const FLORAL_LEFT = `${base}assets/auth/floral-left.svg`
export const FLORAL_RIGHT = `${base}assets/auth/floral-right.svg`
