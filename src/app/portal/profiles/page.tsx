"use client";

import React, { useState } from 'react';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'dak.jen', avatar: '/avatar-placeholder.png' },
    { id: 2, name: 'ben.dashiell', avatar: '/avatar-placeholder.png' },
  ]);

  const [newProfile, setNewProfile] = useState({ name: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setNewProfile({ ...newProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newProfile.name) {
      setProfiles([
        ...profiles,
        {
          id: profiles.length + 1,
          ...newProfile,
          avatar: newProfile.avatar || '/avatar-placeholder.png',
        },
      ]);
      setNewProfile({ name: '', avatar: '' });
      setAvatarPreview(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Profiles Management</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Profile</h2>
        <form onSubmit={handleAddProfile}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Profile Name"
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleAvatarChange}
              />
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" className="w-10 h-10 rounded-full" />
              )}
            </div>
            <button
              type="submit"
              className="bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Profile
            </button>
          </div>
        </form>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Avatar</th>
            <th className="py-2 px-4 border-b">Name</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td className="py-2 px-4 border-b">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile Avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                )}
              </td>
              <td className="py-2 px-4 border-b">{profile.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilesPage;
