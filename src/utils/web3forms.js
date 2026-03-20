const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const REQUIREMENT_EMAIL_SUBJECT = 'Post Your Requirement – Magnum / MAX Life Real Estate';

/**
 * Web3Forms: subscribe OR full inquiry (when `options.message` is set).
 * @param {string} email - User email
 * @param {string} [subject] - Email subject
 * @param {{ message?: string, from_name?: string }} [options] - Optional body + sender display name (requirement flow)
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitSubscribeEmail(email, subject = 'Newsletter subscription', options = {}) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { success: false, message: 'Form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env' };
  }

  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { success: false, message: 'Please enter your email.' };
  }

  const body = {
    access_key: accessKey,
    email: trimmed,
    subject,
    from_name: options.from_name ?? 'Realstate Landing',
  };

  const customMsg = options.message != null ? String(options.message).trim() : '';
  // Hero / Subscribe Now / Coming soon only pass email + subject; Web3Forms still needs a body for a clear inbox entry
  body.message =
    customMsg ||
    `Newsletter / email signup\n\nSubject: ${subject}\nSubmitted from: MAX Life Real Estate website`;

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || 'Something went wrong. Please try again.' };
    }
    if (data.success !== true) {
      return { success: false, message: data.message || 'Something went wrong. Please try again.' };
    }
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Network error. Please check your connection and try again.' };
  }
}

/**
 * Submit Contact Us form to Web3Forms.
 */
export async function submitContactForm({ name, email, message }) {
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();
  if (!trimmedName) return { success: false, message: 'Please enter your name.' };
  if (!trimmedEmail) return { success: false, message: 'Please enter your email.' };
  if (!trimmedMessage) return { success: false, message: 'Please enter a message.' };
  return submitSubscribeEmail(trimmedEmail, 'Contact Us – MAX Life Real Estate', {
    from_name: trimmedName,
    message: trimmedMessage,
  });
}

/**
 * Post Your Requirement – same pipeline as subscribe, with full body text.
 */
export async function submitRequirementForm(data) {
  const email = String(data.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email in Your details.' };
  }

  const secondHomeOpts =
    data.secondHome === 'Yes' && Array.isArray(data.secondHomeOptions) && data.secondHomeOptions.length
      ? data.secondHomeOptions.join(', ')
      : String(data.secondHome || '').toLowerCase() === 'no'
        ? 'N/A'
        : '—';

  const message = [
    'POST YOUR REQUIREMENT',
    '─────────────────────',
    `Are you: ${data.areYou || '—'}`,
    `Full name: ${data.fullName || '—'}`,
    `Employee code: ${data.employeeCode || 'N/A'}`,
    `Associate code: ${data.associateCode || 'N/A'}`,
    `Mobile: ${data.mobile || '—'}`,
    `WhatsApp: ${data.whatsapp || '—'}`,
    `Property requirement: ${data.propertyType || '—'}`,
    `Purpose: ${data.purpose || '—'}`,
    `Configuration: ${data.configuration || '—'}`,
    `Preferred location(s): ${Array.isArray(data.preferredLocations) && data.preferredLocations.length ? data.preferredLocations.join(', ') : '—'}`,
    `Possession required: ${data.possession || '—'}`,
    `Second home interest: ${data.secondHome || '—'}`,
    `Second home options: ${secondHomeOpts}`,
  ].join('\n');

  return submitSubscribeEmail(email, REQUIREMENT_EMAIL_SUBJECT, {
    from_name: String(data.fullName || 'Requirement').slice(0, 120),
    message,
  });
}

export { REQUIREMENT_EMAIL_SUBJECT };
