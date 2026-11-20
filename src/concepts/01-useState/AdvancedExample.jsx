import { useState } from 'react';

export default function AdvancedExample() {
  // Complex form state in a single object
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'developer',
    termsAccepted: false,
  });

  // Derived state computed dynamically during render (Anti-pattern in React 16 was to sync this in useEffect!)
  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const isFormValid =
    formData.firstName.trim().length > 1 &&
    formData.lastName.trim().length > 1 &&
    formData.termsAccepted;

  // Generic change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      role: 'developer',
      termsAccepted: false,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>User Registration Form</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
          Demonstrates object state, generic handlers, and derived values without <code>useEffect</code>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. John"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            <option value="developer">Frontend Developer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="manager">Product Manager</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            I accept the terms & conditions
          </label>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            disabled={!isFormValid}
            style={{
              background: isFormValid ? 'var(--primary)' : 'var(--border-color)',
              color: isFormValid ? '#0f172a' : 'var(--text-muted)',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
            }}
            onClick={() => alert(`Submitted: ${fullName} (${formData.role})`)}
          >
            Register User
          </button>
          <button onClick={handleReset} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
            Reset Form
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="card" style={{ background: '#0b1120' }}>
        <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Real-time Preview (Derived State)</h4>
        <p><strong>Full Name:</strong> {fullName || '—'}</p>
        <p><strong>Assigned Role:</strong> {formData.role}</p>
        <p>
          <strong>Status: </strong>
          <span style={{ color: isFormValid ? 'var(--success)' : 'var(--danger)' }}>
            {isFormValid ? 'Ready to Submit ✅' : 'Incomplete Fields ⚠️'}
          </span>
        </p>
      </div>
    </div>
  );
}
