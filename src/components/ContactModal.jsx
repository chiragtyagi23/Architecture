import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

// const WHATSAPP_PHONE = (import.meta.env.VITE_WHATSAPP_PHONE).replace(/\D/g, '');
const WHATSAPP_PHONE = '917210789372'.replace(/\D/g, '');

const STEPS = [
  { id: 1, label: 'Are you' },
  { id: 2, label: 'Your details' },
  { id: 3, label: 'Property requirement' },
  { id: 4, label: 'Purpose' },
  { id: 5, label: 'Configuration' },
  { id: 6, label: 'Preferred location' },
  { id: 7, label: 'Possession required' },
  { id: 8, label: 'Second home' },
  { id: 9, label: 'Second home options' },
];

const ARE_YOU = [
  { value: 'individual', label: 'Individual' },
  { value: 'magnum_employee', label: 'Magnum Employee' },
  { value: 'magnum_associate', label: 'Magnum Associate' },
  { value: 'magnum_intern', label: 'Magnum Intern' },
];

const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial_shop', label: 'Commercial Shop' },
  { value: 'office_space', label: 'Office Space' },
];

const PURPOSES = [
  { value: 'self_use', label: 'Self use' },
  { value: 'investment', label: 'Investment' },
];

const CONFIGS = ['1 Bhk', '2 Bhk', '3 Bhk', '4 Bhk', '5 Bhk'].map((l) => ({
  value: l.toLowerCase().replace(' ', '_'),
  label: l,
}));

const LOCATIONS = [
  'Nerul',
  'Seawoods',
  'Palm Beach Road',
  'Kharghar',
  'Upper Kharghar',
  'Amandoot metro station',
  'Pendhar metro station',
  'Taloja',
];

const POSSESSION = [
  { value: 'ready_to_move', label: 'Ready to move' },
  { value: '6m_1y', label: '6 months to 1 yr' },
  { value: '18m_2y', label: '18 months to 2 yrs' },
  { value: '2_3y', label: '2 to 3 yrs' },
  { value: '3_4y', label: '3 to 4 yrs' },
  { value: '4_5y', label: '4 to 5 yrs' },
];

const SECOND_HOME_OPTIONS = [
  { value: 'na_plots', label: 'N A Plots' },
  { value: 'bungalow_pool', label: 'Bungalow with pool' },
  { value: 'furnished_villa', label: 'Furnished Villa' },
  { value: 'farmland', label: 'Farmland' },
];

function initialForm() {
  return {
    areYou: '',
    fullName: '',
    employeeCode: '',
    associateCode: '',
    email: '',
    mobile: '',
    whatsapp: '',
    propertyType: '',
    purpose: '',
    configuration: '',
    preferredLocations: [],
    possession: '',
    secondHome: '',
    secondHomeOptions: [],
  };
}

function ContactModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  const reset = useCallback(() => {
    setStep(1);
    setForm(initialForm());
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleLocation = (loc) => {
    setForm((p) => {
      const set = new Set(p.preferredLocations);
      if (set.has(loc)) set.delete(loc);
      else set.add(loc);
      return { ...p, preferredLocations: [...set] };
    });
  };

  const toggleSecondOption = (v) => {
    setForm((p) => {
      const set = new Set(p.secondHomeOptions);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      return { ...p, secondHomeOptions: [...set] };
    });
  };

  const areYouLabel = ARE_YOU.find((o) => o.value === form.areYou)?.label ?? '';
  const progressSteps = form.secondHome === 'no' ? 8 : 9;
  const displayStep = Math.min(step, progressSteps);
  const stepMeta = STEPS.find((s) => s.id === step) ?? STEPS[0];
  const progress = (displayStep / progressSteps) * 100;

  function validateStep(s) {
    switch (s) {
      case 1:
        if (!form.areYou) return 'Please select who you are.';
        break;
      case 2:
        if (!form.fullName.trim()) return 'Please enter full name.';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
        if (!form.mobile.trim()) return 'Please enter mobile number.';
        if (!form.whatsapp.trim()) return 'Please enter WhatsApp number.';
        if (form.areYou === 'magnum_employee' && !form.employeeCode.trim()) return 'Please enter employee code.';
        if (form.areYou === 'magnum_associate' && !form.associateCode.trim()) return 'Please enter associate code.';
        break;
      case 3:
        if (!form.propertyType) return 'Please select property requirement.';
        break;
      case 4:
        if (!form.purpose) return 'Please select purpose.';
        break;
      case 5:
        if (!form.configuration) return 'Please select configuration.';
        break;
      case 6:
        if (!form.preferredLocations.length) return 'Select at least one preferred location.';
        break;
      case 7:
        if (!form.possession) return 'Please select possession timeline.';
        break;
      case 8:
        if (!form.secondHome) return 'Please select if you are interested in a second home.';
        break;
      case 9:
        if (form.secondHome === 'yes' && !form.secondHomeOptions.length) return 'Select at least one second home option.';
        break;
      default:
        break;
    }
    return null;
  }

  function buildPayload(extra = {}) {
    return {
      ...form,
      ...extra,
      areYou: areYouLabel,
      propertyType: PROPERTY_TYPES.find((x) => x.value === form.propertyType)?.label ?? form.propertyType,
      purpose: PURPOSES.find((x) => x.value === form.purpose)?.label ?? form.purpose,
      configuration: CONFIGS.find((x) => x.value === form.configuration)?.label ?? form.configuration,
      possession: POSSESSION.find((x) => x.value === form.possession)?.label ?? form.possession,
    };
  }

  function getWhatsAppMessage(payload) {
    const secondHomeOpts =
      payload.secondHome === 'Yes' && Array.isArray(payload.secondHomeOptions) && payload.secondHomeOptions.length
        ? payload.secondHomeOptions.join(', ')
        : payload.secondHome === 'No' ? 'N/A' : '—';
    return [
      'Hello, I am submitting my requirement from the website.',
      '',
      `*Are you:* ${payload.areYou || '—'}`,
      `*Full name:* ${payload.fullName || '—'}`,
      `*Employee code:* ${payload.employeeCode || 'N/A'}`,
      `*Associate code:* ${payload.associateCode || 'N/A'}`,
      `*Email:* ${payload.email || '—'}`,
      `*Mobile:* ${payload.mobile || '—'}`,
      `*WhatsApp:* ${payload.whatsapp || '—'}`,
      `*Property requirement:* ${payload.propertyType || '—'}`,
      `*Purpose:* ${payload.purpose || '—'}`,
      `*Configuration:* ${payload.configuration || '—'}`,
      `*Preferred location(s):* ${Array.isArray(payload.preferredLocations) && payload.preferredLocations.length ? payload.preferredLocations.join(', ') : '—'}`,
      `*Possession required:* ${payload.possession || '—'}`,
      `*Second home interest:* ${payload.secondHome || '—'}`,
      `*Second home options:* ${secondHomeOpts}`,
    ].join('\n');
  }

  function redirectToWhatsApp(message, formWhatsApp = '') {
    const formPhone = (formWhatsApp || '').replace(/\D/g, '');
    const phone = WHATSAPP_PHONE || formPhone;
    if (!phone) {
      toast.error('Add your WhatsApp number in .env (VITE_WHATSAPP_PHONE) or fill the WhatsApp field in the form.');
      return;
    }
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.location.href = url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateStep(step);
    if (err) {
      toast.error(err);
      return;
    }
    if (step === 8 && form.secondHome === 'no') {
      const payload = buildPayload({ secondHome: 'No', secondHomeOptions: [] });
      const message = getWhatsAppMessage(payload);
      redirectToWhatsApp(message, form.whatsapp);
      reset();
      onClose();
      return;
    }
    if (step === 8 && form.secondHome === 'yes') {
      setStep(9);
      return;
    }
    if (step < 9) {
      setStep((s) => s + 1);
      return;
    }
    const payload = buildPayload({
      secondHome: 'Yes',
      secondHomeOptions: form.secondHomeOptions.map(
        (v) => SECOND_HOME_OPTIONS.find((o) => o.value === v)?.label ?? v
      ),
    });
    const message = getWhatsAppMessage(payload);
    redirectToWhatsApp(message, form.whatsapp);
    reset();
    onClose();
  }

  function handleBack() {
    if (step === 9) setStep(8);
    else if (step > 1) setStep((s) => s - 1);
  }

  function handleCancel() {
    reset();
    onClose();
  }

  const inputClass =
    'w-full h-11 px-3 rounded-lg border border-gray-200 bg-[#F3F4F6] outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED]';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="req-modal-title">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={handleCancel} aria-label="Close modal" />
      <div className="relative w-full max-w-4xl flex flex-col sm:flex-row bg-white rounded-xl shadow-xl overflow-hidden min-h-0 max-sm:h-[min(90dvh,100svh-1rem)] sm:max-h-[90vh]">
        {/* Mobile: fixed viewport height so step list scrolls in top band and form scrolls below */}
        <div className="w-full sm:w-[30%] min-w-0 flex flex-col bg-[#F9FAFB] border-b sm:border-b-0 sm:border-r border-gray-200 p-4 sm:p-8 max-sm:max-h-[34%] max-sm:min-h-0 max-sm:shrink-0 sm:max-h-none">
          <div className="shrink-0">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200 text-gray-600 shrink-0" aria-hidden>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <h2 id="req-modal-title" className="text-base sm:text-lg font-semibold text-gray-900 m-0 leading-tight">
                POST YOUR REQUIREMENT
              </h2>
              <span className="ml-auto w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium shrink-0" title="Info">i</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-snug m-0 mb-2 sm:mb-6 max-sm:line-clamp-2">
              Tell us what you need — we&apos;ll match you with the right property.
            </p>
          </div>
          <nav
            className="flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto overscroll-contain justify-start touch-pan-y py-1 -mx-1 px-1"
            aria-label="Form steps"
          >
            {STEPS.map((s) => {
              const active = step === s.id;
              const done = step > s.id;
              const skipStep9 = s.id === 9 && form.secondHome === 'no';
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 sm:gap-3 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg ${active ? 'bg-gray-200' : ''} ${skipStep9 ? 'opacity-50' : ''}`}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 text-gray-500 shrink-0 text-[0.65rem] sm:text-xs font-medium">
                    {done ? '✓' : s.id}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 leading-tight max-sm:break-words">{s.label}</span>
                </div>
              );
            })}
          </nav>
          <div className="shrink-0 mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 m-0 mb-1 sm:mb-2">
              Step {displayStep} of {progressSteps}
            </p>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 min-h-0 flex flex-col p-4 sm:p-8 sm:min-h-[480px] sm:max-h-[90vh] max-sm:overflow-hidden sm:overflow-y-auto overscroll-contain">
          <div className="flex justify-end mb-2 shrink-0">
            <button type="button" onClick={handleCancel} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain pb-3 sm:pb-2 flex flex-col justify-start items-stretch sm:items-center w-full sm:pt-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 m-0 mb-4 sm:mb-6 w-full max-w-lg text-center px-1 shrink-0">{stepMeta.label}</h3>

              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {ARE_YOU.map((o) => (
                    <label key={o.value} className={`cursor-pointer rounded-lg border-2 p-4 ${form.areYou === o.value ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <input type="radio" name="areYou" value={o.value} checked={form.areYou === o.value} onChange={() => setField('areYou', o.value)} className="sr-only" />
                      <span className="font-semibold text-gray-900">{o.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 w-full max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                    <input type="text" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} className={inputClass} placeholder="As per ID" />
                  </div>
                  {form.areYou === 'magnum_employee' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Employee code</label>
                      <input type="text" value={form.employeeCode} onChange={(e) => setField('employeeCode', e.target.value)} className={inputClass} />
                    </div>
                  )}
                  {form.areYou === 'magnum_associate' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Associate code</label>
                      <input type="text" value={form.associateCode} onChange={(e) => setField('associateCode', e.target.value)} className={inputClass} />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (for correspondence)</label>
                    <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile number</label>
                      <input type="tel" value={form.mobile} onChange={(e) => setField('mobile', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp number</label>
                      <input type="tel" value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                  {PROPERTY_TYPES.map((o) => (
                    <label key={o.value} className={`cursor-pointer rounded-lg border-2 p-4 text-center ${form.propertyType === o.value ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <input type="radio" name="propertyType" value={o.value} checked={form.propertyType === o.value} onChange={() => setField('propertyType', o.value)} className="sr-only" />
                      <span className="font-semibold text-gray-900">{o.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {PURPOSES.map((o) => (
                    <label key={o.value} className={`cursor-pointer rounded-lg border-2 p-5 text-center ${form.purpose === o.value ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white'}`}>
                      <input type="radio" name="purpose" value={o.value} checked={form.purpose === o.value} onChange={() => setField('purpose', o.value)} className="sr-only" />
                      <span className="font-semibold text-gray-900">{o.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="flex flex-wrap gap-2 justify-center max-w-xl">
                  {CONFIGS.map((o) => (
                    <label key={o.value} className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold border-2 ${form.configuration === o.value ? 'border-gray-500 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}>
                      <input type="radio" name="configuration" value={o.value} checked={form.configuration === o.value} onChange={() => setField('configuration', o.value)} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
              )}

              {step === 6 && (
                <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                  {LOCATIONS.map((loc) => (
                    <button key={loc} type="button" onClick={() => toggleLocation(loc)} className={`rounded-lg px-4 py-2.5 text-sm font-medium border-2 ${form.preferredLocations.includes(loc) ? 'border-gray-400 bg-gray-100 text-gray-900' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}>
                      {loc}
                    </button>
                  ))}
                </div>
              )}

              {step === 7 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
                  {POSSESSION.map((o) => (
                    <label key={o.value} className={`cursor-pointer rounded-lg border-2 p-3.5 ${form.possession === o.value ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white'}`}>
                      <input type="radio" name="possession" value={o.value} checked={form.possession === o.value} onChange={() => setField('possession', o.value)} className="sr-only" />
                      <span className="text-sm font-medium text-gray-800">{o.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 8 && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {['yes', 'no'].map((v) => (
                    <label key={v} className={`cursor-pointer rounded-lg border-2 p-8 text-center text-lg font-bold ${form.secondHome === v ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white'}`}>
                      <input type="radio" name="secondHome" value={v} checked={form.secondHome === v} onChange={() => setField('secondHome', v)} className="sr-only" />
                      {v === 'yes' ? 'Yes' : 'No'}
                    </label>
                  ))}
                </div>
              )}

              {step === 9 && form.secondHome === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {SECOND_HOME_OPTIONS.map((o) => (
                    <button key={o.value} type="button" onClick={() => toggleSecondOption(o.value)} className={`rounded-lg border-2 p-4 text-left font-semibold ${form.secondHomeOptions.includes(o.value) ? 'border-gray-400 bg-gray-100 text-gray-900' : 'border-gray-200 bg-white text-gray-800'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="shrink-0 w-full max-sm:border-t max-sm:border-gray-200 max-sm:bg-white max-sm:pt-3 max-sm:pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-3">
              {/* Mobile: Back+Cancel row, then Continue (primary at bottom); desktop: one row */}
              <div className="flex w-full gap-2 sm:w-auto sm:flex-none max-sm:order-1">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="h-12 sm:h-10 min-h-[3rem] sm:min-h-0 flex-1 sm:flex-none min-w-0 px-3 sm:px-5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 touch-manipulation">
                    Back
                  </button>
                )}
                <button type="button" onClick={handleCancel} className="h-12 sm:h-10 min-h-[3rem] sm:min-h-0 flex-1 sm:flex-none min-w-0 px-3 sm:px-5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 touch-manipulation">
                  Cancel
                </button>
              </div>
              <button type="submit" disabled={loading} className="max-sm:order-2 h-12 sm:h-10 min-h-[3rem] sm:min-h-0 w-full sm:w-auto shrink-0 px-4 sm:px-5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation whitespace-normal sm:whitespace-nowrap text-center leading-snug py-2 sm:py-0">
                {loading ? 'Sending…' : step === 9 || (step === 8 && form.secondHome === 'no') ? 'Submit requirement' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
