import React, { useEffect, useState } from 'react';
import '../styles/EditProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { apiMe, apiUpdateMe } from '../api/auth';

const EditProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        if (user?.name) {
          setName(user.name);
          return;
        }
        const data = await apiMe();
        if (active && data?.user?.name) setName(data.user.name);
      } catch (_e) { /* ignore */ }
    }
    init();
    return () => { active = false; };
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);
    apiUpdateMe({ name, password: password || undefined })
      .then(({ user: updated }) => {
        setUser(updated);
        setMessage('Profile updated');
        setPassword('');
      })
      .catch(err => setError(err.message || 'Failed to update'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Update Profile'}</button>
      </form>
      {message ? <p style={{ color: 'green', marginTop: 8 }}>{message}</p> : null}
      {error ? <p style={{ color: 'red', marginTop: 8 }}>{error}</p> : null}
    </div>
  );
};

export default EditProfilePage;
