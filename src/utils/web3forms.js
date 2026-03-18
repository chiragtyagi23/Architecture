const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Submit a subscribe email to Web3Forms.
 * @param {string} email - User email address
 * @param {string} [subject] - Optional subject (default: "Newsletter subscription")
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitSubscribeEmail(email, subject = 'Newsletter subscription') {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { success: false, message: 'Form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env' };
  }

  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { success: false, message: 'Please enter your email.' };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        email: trimmed,
        subject,
        from_name: 'Realstate Landing',
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || 'Something went wrong. Please try again.' };
    }
    if (data.success !== true) {
      return { success: false, message: data.message || 'Subscription failed. Please try again.' };
    }
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Network error. Please check your connection and try again.' };
  }
}

/**
 * Submit Contact Us form to Web3Forms.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitContactForm({ name, email, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { success: false, message: 'Form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env' };
  }
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();
  if (!trimmedName) return { success: false, message: 'Please enter your name.' };
  if (!trimmedEmail) return { success: false, message: 'Please enter your email.' };
  if (!trimmedMessage) return { success: false, message: 'Please enter a message.' };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Contact Us – MAX Life Real Estate',
        from_name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, message: data.message || 'Something went wrong. Please try again.' };
    if (data.success !== true) return { success: false, message: data.message || 'Failed to send. Please try again.' };
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Network error. Please check your connection and try again.' };
  }
}

/**
 * Post Your Requirement – full form as email body via Web3Forms.
 */
export async function submitRequirementForm(data) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { success: false, message: 'Form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env' };
  }
  const email = String(data.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email in Your details.' };
  }
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
    `Second home options: ${Array.isArray(data.secondHomeOptions) && data.secondHomeOptions.length ? data.secondHomeOptions.join(', ') : data.secondHome === 'no' ? 'N/A' : '—'}`,
  ].join('\n');

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Post Your Requirement – Magnum / MAX Life Real Estate',
        from_name: String(data.fullName || 'Requirement').slice(0, 120),
        email,
        message,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, message: json.message || 'Something went wrong.' };
    if (json.success !== true) return { success: false, message: json.message || 'Failed to send.' };
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
