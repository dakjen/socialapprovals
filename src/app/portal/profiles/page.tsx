"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
}

interface SocialProfile {
  id: number;
  userId: number;
  clientId: number; // Added clientId
  platform: string;
  username: string;
  profilePicUrl: string | null;
  createdAt: string;
  userName?: string; // For display purposes
  clientName?: string; // For display purposes
}

interface Client {
  id: number;
  userId: number;
  name: string;
  company: string;
  industry: string | null;
  createdAt: string;
  userName?: string; // For display purposes
}

const ProfileManagementPage = () => {
  const [profiles, setProfiles] = useState<SocialProfile[]>([]);
  const [clients, setClients] = useState<Client[]>([]); // State for fetched clients
  const [newProfile, setNewProfile] = useState({ platform: '', username: '' });
  const [newProfilePicFile, setNewProfilePicFile] = useState<File | null>(null); // State for the selected file
  const [newClient, setNewClient] = useState({ name: '', company: '', industry: '' }); // State for new client
  const [selectedClientId, setSelectedClientId] = useState(''); // State for selected client in profile form

  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);
  const [addingProfile, setAddingProfile] = useState(false);
  const [addingClient, setAddingClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch social media profiles
  const fetchProfiles = useCallback(async () => {
    setLoadingProfiles(true);
    setError(null);
    try {
      const response = await fetch('/api/profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch social media profiles');
      }
      const data: SocialProfile[] = await response.json();
      
      const usersResponse = await fetch('/api/users');
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users for profiles');
      }
      const usersData: User[] = await usersResponse.json();

      const clientsResponse = await fetch('/api/clients');
      if (!clientsResponse.ok) {
        throw new Error('Failed to fetch clients for profiles');
      }
      const clientsData: Client[] = await clientsResponse.json();

      const profilesWithDetails = data.map(profile => ({
        ...profile,
        userName: usersData.find(user => user.id === profile.userId)?.name || 'Unknown User',
        clientName: clientsData.find(client => client.id === profile.clientId)?.name || 'Unknown Client' // Assuming clientId will be part of profile
      }));

      setProfiles(profilesWithDetails);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingProfiles(false);
    }
  }, []);

  // Fetch clients
  const fetchClients = useCallback(async () => {
    setLoadingClients(true);
    setError(null);
    try {
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data: Client[] = await response.json();
      
      const usersResponse = await fetch('/api/users');
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users for clients');
      }
      const usersData: User[] = await usersResponse.json();

      const clientsWithUserNames = data.map(client => ({
        ...client,
        userName: usersData.find(user => user.id === client.userId)?.name || 'Unknown User'
      }));

      setClients(clientsWithUserNames);
      if (data.length > 0) {
        setSelectedClientId(String(data[0].id)); // Select first client by default
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingClients(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
    fetchClients();
  }, [fetchProfiles, fetchClients]);

  const handleAddProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newProfile.platform || !newProfile.username || !selectedClientId) { // ClientId now required
      setError('Client, Platform, and Username are required.');
      return;
    }

    setAddingProfile(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('userId', '1'); // TEMPORARY: Hardcode userId to 1 until authentication is implemented
      formData.append('platform', newProfile.platform);
      formData.append('username', newProfile.username);
      formData.append('clientId', selectedClientId); // Send selected client ID
      if (newProfilePicFile) {
        formData.append('profilePic', newProfilePicFile);
      }

      const response = await fetch('/api/profiles', {
        method: 'POST',
        body: formData, // Send FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add profile');
      }

      await fetchProfiles(); // Re-fetch list to include new profile
      setNewProfile({ platform: '', username: '' }); // Clear form fields
      setNewProfilePicFile(null); // Clear selected file
      // setSelectedClientId(''); // Maybe reset to first client or empty
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingProfile(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newClient.name || !newClient.company) {
      setError('Client Name and Company are required.');
      return;
    }

    setAddingClient(true);
    setError(null);
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // TEMPORARY: Hardcode userId to 1
          name: newClient.name,
          company: newClient.company,
          industry: newClient.industry,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add client');
      }

      await fetchClients(); // Re-fetch client list
      setNewClient({ name: '', company: '', industry: '' }); // Clear form fields
      // setSelectedClientId(''); // If new client is added, perhaps pre-select it in profile form
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingClient(false);
    }
  };

  if (loadingProfiles || loadingClients) {
    return <div className="text-center py-8">Loading data...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column: Social Media Profile Management */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">Social Media Profile Management</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Profile</h2>
          <form onSubmit={handleAddProfile}>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="clientId">
                  Client
                </label>
                <select
                  id="clientId"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.company})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Platform (e.g., Instagram)"
                value={newProfile.platform}
                onChange={(e) => setNewProfile({ ...newProfile, platform: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Username"
                value={newProfile.username}
                onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
              />
              <div>
                <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="profilePic">
                  Profile Picture (Optional)
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={(e) => setNewProfilePicFile(e.target.files ? e.target.files[0] : null)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={addingProfile || loadingClients || clients.length === 0}
              >
                {addingProfile ? 'Adding...' : 'Add Profile'}
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </form>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">User</th>
              <th className="py-2 px-4 border-b text-left">Client</th> {/* Added Client column */}
              <th className="py-2 px-4 border-b text-left">Platform</th>
              <th className="py-2 px-4 border-b text-left">Username</th>
              <th className="py-2 px-4 border-b text-left">Profile Pic</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              {/* Add Actions column later */}
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td className="py-2 px-4 border-b">{profile.id}</td>
                <td className="py-2 px-4 border-b">{profile.userName}</td>
                {/* Find client name from clients array based on profile.clientId */}
                <td className="py-2 px-4 border-b">{clients.find(c => c.id === profile.clientId)?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{profile.platform}</td>
                <td className="py-2 px-4 border-b">{profile.username}</td>
                <td className="py-2 px-4 border-b">
                  {profile.profilePicUrl ? (
                    <img src={profile.profilePicUrl} alt="Profile Pic" className="h-10 w-10 object-cover rounded-full" />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border-b">{new Date(profile.createdAt).toLocaleDateString()}</td>
                {/* Add Delete/Edit buttons later */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Column: Add Client Section Placeholder */}
      <div className="md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Client</h2>
        <form onSubmit={handleAddClient} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="Client Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Company"
              value={newClient.company}
              onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Industry (Optional)"
              value={newClient.industry}
              onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={addingClient}
            >
              {addingClient ? 'Adding...' : 'Add Client'}
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfileManagementPage;