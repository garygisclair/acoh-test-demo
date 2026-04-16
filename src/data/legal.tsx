import type { ReactNode } from 'react'

const H3: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  color: '#825cd4',
  margin: '0 0 10px 0',
}

const P: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 13,
  lineHeight: 1.55,
  color: 'var(--acoh-body)',
  margin: '0 0 20px 0',
}

const EFFECTIVE: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 12,
  color: 'var(--acoh-muted)',
  margin: '0 0 20px 0',
}

export const TERMS_TITLE = 'Terms of Service'
export const PRIVACY_TITLE = 'Privacy Policy'

export function TermsBody(): ReactNode {
  return (
    <>
      <p style={EFFECTIVE}>Effective Date: Summer 2026</p>

      <h3 style={H3}>Acceptance of Terms</h3>
      <p style={P}>
        By joining the waitlist or using A Couple of Habits, you agree to these Terms of Service. If
        you do not agree, please do not use the service.
      </p>

      <h3 style={H3}>The Service</h3>
      <p style={P}>
        A Couple of Habits is a relationship habit-tracking application for couples. We provide
        tools to set shared goals, track daily actions, and reflect on progress together.
      </p>

      <h3 style={H3}>Accounts &amp; Pairing</h3>
      <p style={P}>
        You must create an account and invite a partner to use the full service. You are responsible
        for maintaining the security of your account. Each person in a couple maintains their own
        account and data.
      </p>

      <h3 style={H3}>Acceptable Use</h3>
      <p style={P}>
        You agree not to misuse the service, attempt to access another user's data, or use the
        platform for any unlawful purpose. We reserve the right to suspend accounts that violate
        these terms.
      </p>

      <h3 style={H3}>Data &amp; Privacy</h3>
      <p style={P}>
        Your use of the service is also governed by our Privacy Policy. Habit data is shared only
        between paired partners. You may delete your account and data at any time.
      </p>

      <h3 style={H3}>Limitation of Liability</h3>
      <p style={{ ...P, marginBottom: 0 }}>
        A Couple of Habits is provided as-is. We are not responsible for relationship outcomes. The
        service is a tool for building habits, not a substitute for professional counseling.
      </p>
    </>
  )
}

export function PrivacyBody(): ReactNode {
  return (
    <>
      <p style={EFFECTIVE}>Effective Date: Summer 2026</p>

      <h3 style={H3}>What We Collect</h3>
      <p style={P}>
        We collect your email address when you join the waitlist. When the app launches, we collect
        account information, habit data, and usage analytics to provide and improve the service.
      </p>

      <h3 style={H3}>How We Use Your Data</h3>
      <p style={P}>
        Your data is used solely to operate A Couple of Habits. We do not sell your personal
        information. Habit data is shared only between paired partners within your couple.
      </p>

      <h3 style={H3}>Data Security</h3>
      <p style={P}>
        All relationship and habit data is end-to-end encrypted. We use industry-standard security
        practices to protect your information in transit and at rest.
      </p>

      <h3 style={H3}>Your Rights</h3>
      <p style={P}>
        You may request access to, correction of, or deletion of your personal data at any time by
        contacting us. You can delete your account and all associated data from within the app.
      </p>

      <h3 style={H3}>Contact</h3>
      <p style={{ ...P, marginBottom: 0 }}>
        For privacy-related questions, reach us at privacy@acoupleofhabits.com.
      </p>
    </>
  )
}
