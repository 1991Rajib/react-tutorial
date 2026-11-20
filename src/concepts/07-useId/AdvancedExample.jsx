import { useId, useState } from 'react';

function DynamicUserRow({ index, onRemove }) {
  const rowId = useId();
  const nameId = `${rowId}-name`;
  const roleId = `${rowId}-role`;
  const errId = `${rowId}-err`;

  const [name, setName] = useState('');
  const hasError = name.length > 0 && name.length < 3;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        gap: '12px',
        alignItems: 'start',
        background: '#0b1120',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}
    >
      <div>
        <label htmlFor={nameId} style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
          Member #{index + 1} Name
        </label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? errId : undefined}
          placeholder="Full name"
          style={{ width: '100%', borderColor: hasError ? 'var(--danger)' : undefined }}
        />
        {hasError && (
          <span id={errId} style={{ display: 'block', fontSize: '11px', color: 'var(--danger)', marginTop: '4px' }}>
            Must be at least 3 characters
          </span>
        )}
      </div>

      <div>
        <label htmlFor={roleId} style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
          Assigned Role
        </label>
        <select id={roleId} style={{ width: '100%' }}>
          <option value="dev">Software Engineer</option>
          <option value="qa">QA Analyst</option>
          <option value="lead">Team Lead</option>
        </select>
      </div>

      <button
        onClick={onRemove}
        style={{
          background: 'transparent',
          color: 'var(--danger)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          marginTop: '20px',
          padding: '8px 12px',
        }}
        title="Remove member"
      >
        ✕
      </button>
    </div>
  );
}

export default function AdvancedExample() {
  const [members, setMembers] = useState([1, 2]);

  const addMember = () => {
    setMembers((prev) => [...prev, Date.now()]);
  };

  const removeMember = (idToRemove) => {
    setMembers((prev) => prev.filter((id) => id !== idToRemove));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Dynamic Multi-Field Generator (useId in Loops)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Each dynamically added row generates isolated, collision-free ARIA accessibility IDs for name, role, and error labels.
        </p>

        <button onClick={addMember} style={{ background: 'var(--primary)', color: '#0f172a', marginBottom: '16px' }}>
          + Add Team Member
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {members.map((id, idx) => (
          <DynamicUserRow
            key={id}
            index={idx}
            onRemove={() => removeMember(id)}
          />
        ))}
      </div>
    </div>
  );
}
