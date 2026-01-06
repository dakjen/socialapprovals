"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' }); // Added role
  const [loading, setLoading] = useState(true);
  const [addingUser, setAddingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('Name, Email, and Password are required.');
      return;
    }

    setAddingUser(true);
    setError(null);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser), // newUser now includes role
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add user');
      }

      // User added successfully, re-fetch the list
      await fetchUsers();
      setNewUser({ name: '', email: '', password: '', role: 'user' }); // Clear form fields and reset role
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingUser(false);
    }
  };

  const [deletingUser, setDeletingUser] = useState<number | null>(null); // State to track which user is being deleted
  const [editingRole, setEditingRole] = useState<number | null>(null); // State to track which user's role is being edited

  const handleDeleteUser = async (userId: number) => {
    setDeletingUser(userId);
    setError(null);
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      // User deleted successfully, re-fetch the list
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingUser(null);
    }
  };

  const handleChangeRole = async (userId: number, newRole: string) => {
    setEditingRole(userId);
    setError(null);
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update role');
      }

      // Role updated successfully, re-fetch the list
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setEditingRole(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">User Management</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
              <option value="approver">Approver</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={addingUser}
            >
              {addingUser ? 'Adding...' : 'Add User'}
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
            <th className="py-2 px-4 border-b text-left">Created At</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user.id, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                  disabled={editingRole === user.id} // Disable during edit
                >
                  <option value="user">User</option>
                  <option value="approver">Approver</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-xs"
                  disabled={deletingUser === user.id}
                >
                  {deletingUser === user.id ? '...' : '✕'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;