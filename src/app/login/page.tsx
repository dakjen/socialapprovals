"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-[#b8b8b8] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#000000] mb-8">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-2 border-[#740403]"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <a href="/register" className="inline-block bg-transparent hover:bg-[#740403] text-[#740403] font-semibold hover:text-white py-2 px-4 border border-[#740403] hover:border-transparent rounded">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
