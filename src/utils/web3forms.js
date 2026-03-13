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
