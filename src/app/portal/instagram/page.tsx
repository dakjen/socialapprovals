
import React from 'react';
import Link from 'next/link';

const InstagramPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Instagram Integration</h1>
        <Link href="/portal/instagram/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Post
          </button>
        </Link>
      </div>
      <p>This is where the Instagram content will be displayed.</p>
    </div>
  );
};

export default InstagramPage;
