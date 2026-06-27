/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

/**
 * Validate a URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a string is non-empty after trimming.
 * @param {string} value
 * @returns {boolean}
 */
export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0
}

/**
 * Validate password strength (min 8 chars, at least 1 uppercase and 1 number).
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number.' }
  }
  return { valid: true, message: '' }
}

/**
 * Form validation helper — returns an error map.
 * @param {Object} fields - { fieldName: value }
 * @param {Object} rules - { fieldName: (value) => string|null }
 * @returns {Object} errors - { fieldName: string }
 */
export function validateForm(fields, rules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(fields[field])
    if (error) errors[field] = error
  }
  return errors
}
