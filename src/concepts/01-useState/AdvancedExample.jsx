import { useState } from 'react';

export default function AdvancedExample() {
  // 1. Complex Form State in a single cohesive object
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Full-Stack Developer',
    billingCycle: 'annual', // 'monthly' | 'annual'
    termsAccepted: false,
  });

  const [submittedUser, setSubmittedUser] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);

  // 2. Computed / Derived Validation Flags (Instant feedback without useEffect)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isNameValid = formData.firstName.trim().length >= 2 && formData.lastName.trim().length >= 2;
  const isFormValid = isNameValid && isEmailValid && formData.termsAccepted;

  // Pricing derivation
  const baseMonthly = 49;
  const effectiveMonthlyRate = formData.billingCycle === 'annual' ? Math.round(baseMonthly * 0.8) : baseMonthly;
  const annualTotal = effectiveMonthlyRate * 12;

  // Generic controlled input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setSubmittedUser({
      ...formData,
      id: `usr_${Date.now().toString().slice(-4)}`,
      submittedAt: new Date().toLocaleTimeString(),
    });
    setSubmitCount((c) => c + 1);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'Full-Stack Developer',
      billingCycle: 'annual',
      termsAccepted: false,
    });
    setSubmittedUser(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Enterprise Workspace Onboarding</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates single-object form management, multi-condition validation, derived discounts, and clean state resets.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px' }}>
        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Rajib"
                value={formData.firstName}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 10px', fontSize: '13px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Developer"
                value={formData.lastName}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 10px', fontSize: '13px' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
              Work Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: '13px',
                borderColor: formData.email && !isEmailValid ? 'var(--danger)' : undefined,
              }}
              required
            />
            {formData.email && !isEmailValid && (
              <span style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '2px', display: 'block' }}>
                Please enter a valid business email address.
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
              Primary Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px 10px', fontSize: '13px' }}
            >
              <option value="Full-Stack Developer">Full-Stack Developer</option>
              <option value="Frontend Architect">Frontend Architect</option>
              <option value="Engineering Manager">Engineering Manager</option>
              <option value="DevOps Specialist">DevOps Specialist</option>
            </select>
          </div>

          {/* Billing Cycle Radio with instant derived pricing */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
              Seat Billing Cadence:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <label
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: `1px solid ${formData.billingCycle === 'annual' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: formData.billingCycle === 'annual' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <input
                  type="radio"
                  name="billingCycle"
                  value="annual"
                  checked={formData.billingCycle === 'annual'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Annual Billing</strong>
                  <div style={{ color: 'var(--success)', fontSize: '11px' }}>Save 20% ($39/mo)</div>
                </div>
              </label>

              <label
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: `1px solid ${formData.billingCycle === 'monthly' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: formData.billingCycle === 'monthly' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <input
                  type="radio"
                  name="billingCycle"
                  value="monthly"
                  checked={formData.billingCycle === 'monthly'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Monthly Billing</strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>$49/mo regular</div>
                </div>
              </label>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <span>I acknowledge and accept the Workspace Security SLA</span>
          </label>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                flex: 1,
                background: isFormValid ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: isFormValid ? '#0f172a' : 'var(--text-muted)',
                fontWeight: 'bold',
                padding: '10px',
                fontSize: '13px',
              }}
            >
              Confirm &amp; Provision Seat
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '10px 14px',
                fontSize: '13px',
              }}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Live Preview & Status Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Real-time State Card */}
          <div
            style={{
              background: '#0b1120',
              padding: '18px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '10px' }}>
              Live Profile Preview Card
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                {formData.firstName ? formData.firstName[0].toUpperCase() : 'U'}
                {formData.lastName ? formData.lastName[0].toUpperCase() : ''}
              </div>
              <div>
                <strong style={{ fontSize: '14px' }}>
                  {formData.firstName || formData.lastName
                    ? `${formData.firstName} ${formData.lastName}`.trim()
                    : 'Unassigned User'}
                </strong>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {formData.email || 'no-email-set@company.com'}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Role:</span>
                <span style={{ color: 'var(--primary)' }}>{formData.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subscription:</span>
                <span>
                  ${effectiveMonthlyRate}/mo ({formData.billingCycle === 'annual' ? `$${annualTotal}/yr` : 'Monthly'})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Validation Status:</span>
                <span style={{ color: isFormValid ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                  {isFormValid ? '✓ Ready to Submit' : '⚠ Missing Fields'}
                </span>
              </div>
            </div>
          </div>

          {/* Submission Feedback Toast */}
          {submittedUser && (
            <div
              style={{
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            >
              <div style={{ color: 'var(--success)', fontWeight: 'bold', marginBottom: '4px' }}>
                🎉 Successfully provisioned seat (#{submitCount})
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                User ID: <code>{submittedUser.id}</code> at {submittedUser.submittedAt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
