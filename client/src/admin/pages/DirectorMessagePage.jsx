import { useState, useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import { HiUserCircle, HiSave, HiAcademicCap, HiOfficeBuilding, HiBadgeCheck, HiUserGroup } from 'react-icons/hi';
import toast from 'react-hot-toast';

const LEADER_KEYS = [
  { id: 'ministerMessage', label: 'Minister for Education', defaultDesignation: 'Minister for Education & Literacy, Sindh', icon: HiBadgeCheck, color: 'var(--color-primary)' },
  { id: 'secretaryMessage', label: 'Secretary College Education', defaultDesignation: 'Secretary, College Education Dept, Sindh', icon: HiOfficeBuilding, color: 'var(--color-secondary)' },
  { id: 'dcMessage', label: 'Deputy Commissioner (DC)', defaultDesignation: 'Deputy Commissioner, District Ghotki', icon: HiUserGroup, color: '#D69E2E' },
  { id: 'principalMessage', label: 'Principal / Director', defaultDesignation: 'Principal, GDC Adilpur', icon: HiAcademicCap, color: 'var(--color-accent)' },
];

const DirectorMessagePage = () => {
  const { loading, fetchSingleton, updateSingleton } = useCrud('/college-profile', { autoFetch: false });
  const [activeLeader, setActiveLeader] = useState('ministerMessage');
  const [leadership, setLeadership] = useState({
    ministerMessage: { name: '', designation: 'Minister for Education & Literacy, Sindh', photoUrl: '', message: '' },
    secretaryMessage: { name: '', designation: 'Secretary, College Education Dept, Sindh', photoUrl: '', message: '' },
    dcMessage: { name: '', designation: 'Deputy Commissioner, District Ghotki', photoUrl: '', message: '' },
    principalMessage: { name: '', designation: 'Principal, GDC Adilpur', photoUrl: '', message: '' },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const profile = await fetchSingleton();
    if (profile?.leadership) {
      setLeadership((prev) => ({
        ...prev,
        ...profile.leadership,
      }));
    } else if (profile?.directorMessage) {
      // Fallback if legacy profile
      setLeadership((prev) => ({
        ...prev,
        principalMessage: profile.directorMessage,
      }));
    }
  };

  const handleFieldChange = (key, field, value) => {
    setLeadership((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const currentPrincipal = leadership.principalMessage;
      await updateSingleton({
        leadership,
        directorMessage: currentPrincipal, // sync legacy field
      });
      toast.success('Leadership messages saved successfully!');
    } catch {
      toast.error('Failed to save leadership messages');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>Loading leadership settings...</div>;

  const currentLeaderObj = LEADER_KEYS.find((l) => l.id === activeLeader);
  const currentLeaderData = leadership[activeLeader] || {};

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Leadership & Dignitaries Messages
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
          Manage official statements and photos for Education Minister, Secretary, Deputy Commissioner, and Principal.
        </p>
      </div>

      {/* Leader Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {LEADER_KEYS.map((leader) => {
          const Icon = leader.icon;
          const isActive = activeLeader === leader.id;
          return (
            <button
              key={leader.id}
              onClick={() => setActiveLeader(leader.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${isActive ? leader.color : 'var(--border-default)'}`,
                background: isActive ? 'var(--bg-surface)' : 'var(--bg-body)',
                boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isActive ? `${leader.color}20` : 'var(--bg-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: leader.color, flexShrink: 0,
              }}>
                <Icon style={{ fontSize: '1.25rem' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: isActive ? '700' : '600', color: 'var(--text-primary)' }}>
                  {leader.label}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '110px' }}>
                  {leadership[leader.id]?.name || 'Not set'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Form + Preview Grid */}
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}>
        {/* Form */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentLeaderObj?.color }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Edit {currentLeaderObj?.label}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name <span style={{ color: 'var(--color-danger)' }}>*</span></label>
              <input
                className="form-input"
                required
                value={currentLeaderData.name || ''}
                onChange={(e) => handleFieldChange(activeLeader, 'name', e.target.value)}
                placeholder="e.g. Syed Sardar Ali Shah"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Designation</label>
              <input
                className="form-input"
                value={currentLeaderData.designation || ''}
                onChange={(e) => handleFieldChange(activeLeader, 'designation', e.target.value)}
                placeholder={currentLeaderObj?.defaultDesignation}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Photo URL</label>
              <input
                className="form-input"
                type="url"
                value={currentLeaderData.photoUrl || ''}
                onChange={(e) => handleFieldChange(activeLeader, 'photoUrl', e.target.value)}
                placeholder="https://res.cloudinary.com/..."
              />
              <p className="form-hint">Paste direct image link or Cloudinary upload URL</p>
            </div>

            <div className="form-group">
              <label className="form-label">Official Message / Statement</label>
              <textarea
                className="form-textarea"
                rows={7}
                value={currentLeaderData.message || ''}
                onChange={(e) => handleFieldChange(activeLeader, 'message', e.target.value)}
                placeholder="Enter official message to students, faculty, and public..."
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
              <HiSave /> {saving ? 'Saving Leadership Messages...' : 'Save All Leadership Messages'}
            </button>
          </form>
        </div>

        {/* Live Preview Card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-tertiary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Live Portal Card Preview
          </h3>

          <div className="card" style={{ padding: '1.5rem', textAlign: 'center', border: `2px solid ${currentLeaderObj?.color}30` }}>
            <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 1rem' }}>
              {currentLeaderData.photoUrl ? (
                <img
                  src={currentLeaderData.photoUrl}
                  alt={currentLeaderData.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: `3px solid ${currentLeaderObj?.color}`, boxShadow: 'var(--shadow-md)' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '3rem', border: '2px dashed var(--border-default)' }}>
                  <HiUserCircle />
                </div>
              )}
            </div>

            <span className="badge badge-primary" style={{ background: currentLeaderObj?.color, color: '#fff', fontSize: '0.6875rem', marginBottom: '0.5rem', display: 'inline-block' }}>
              {currentLeaderObj?.label}
            </span>

            <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {currentLeaderData.name || 'Dignitary Name'}
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '1rem' }}>
              {currentLeaderData.designation || currentLeaderObj?.defaultDesignation}
            </p>

            <div style={{ textAlign: 'left', background: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {currentLeaderData.message || 'Official message will be displayed here...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorMessagePage;
