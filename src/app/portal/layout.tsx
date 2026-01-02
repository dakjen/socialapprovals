
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-[#b8b8b8]">
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#000000]">Social Media</h2>
        </div>
        <nav className="flex-1">
          <ul>
            <Link href="/portal/instagram">
              <li className="p-4 hover:bg-[#b8b8b8] cursor-pointer text-[#000000]">
                Instagram
              </li>
            </Link>
          </ul>
        </nav>
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#000000]">Settings</h2>
        </div>
        <nav>
          <ul>
            <Link href="/portal/users">
              <li className="p-4 hover:bg-[#b8b8b8] cursor-pointer text-[#000000]">
                User Management
              </li>
            </Link>
            <Link href="/portal/profiles">
              <li className="p-4 hover:bg-[#b8b8b8] cursor-pointer text-[#000000]">
                Profiles
              </li>
            </Link>
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="flex-1 p-8 bg-[#b8b8b8]">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;
