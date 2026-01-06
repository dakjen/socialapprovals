'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostPreview from '../../PostPreview';

interface PostData {
  profileId: string;
  caption: string;
  date: string;
  imageFiles: File[]; // Re-added to fix build error
  imagePreviews: string[];
  username: string; // To display in preview
  profilePicUrl: string; // Added this line
}

// New inner component to handle client-side logic
const ApprovePostContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [approvers, setApprovers] = useState<{ id: string; name: string }[]>([]);
  const [selectedApprover, setSelectedApprover] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedPostData = sessionStorage.getItem('draftPost');
    if (storedPostData) {
      const parsedData: PostData = JSON.parse(storedPostData);
      setPostData(parsedData);
      sessionStorage.removeItem('draftPost');
    } else {
      router.push('/portal/instagram/new');
    }

    const fetchApprovers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch approvers');
        }
        const data = await response.json();
        setApprovers(data.map((user: any) => ({ id: String(user.id), name: user.name })));
        if (data.length > 0) {
          setSelectedApprover(String(data[0].id));
        }
      } catch (err: any) {
        console.error('Error fetching approvers:', err);
        setError('Failed to load approvers.');
      }
    };
    fetchApprovers();
  }, [router]);

  const handleSendToApprover = async () => {
    if (!postData || !selectedApprover) {
      setError('Post data or approver not selected.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('profileId', postData.profileId);
    formData.append('caption', postData.caption);
    formData.append('date', postData.date);
    formData.append('approverId', selectedApprover);

    if (postData.imageFiles && postData.imageFiles.length > 0) {
      postData.imageFiles.forEach((file: any) => {
        formData.append('images', file);
      });
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send post for approval');
      }

      router.push('/portal/instagram');
    } catch (err: any) {
      console.error('Error sending post for approval:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!postData) {
    return <p>Loading post data...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-8">Approve New Post</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Post Preview */}
        <div className="md:w-1/2">
          <PostPreview
            images={postData.imagePreviews}
            caption={postData.caption}
            username={postData.username}
            date={postData.date}
            profilePicUrl={postData.profilePicUrl} // Added this line
          />
        </div>

        {/* Right Column: Approval Form */}
        <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Send for Approval</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="approver">
              Select Approver
            </label>
            {approvers.length > 0 ? (
              <select
                id="approver"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedApprover}
                onChange={(e) => setSelectedApprover(e.target.value)}
                disabled={loading}
              >
                {approvers.map((approver) => (
                  <option key={approver.id} value={approver.id}>
                    {approver.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>No approvers found. Please ensure there are users in the system.</p>
            )}
          </div>
          <button
            onClick={handleSendToApprover}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading || !selectedApprover}
          >
            {loading ? 'Sending...' : 'Send to Approver'}
          </button>
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

// Main page component that wraps the client-side content with Suspense
const ApprovePostPage = () => {
  return (
    <Suspense fallback={<div>Loading approval page...</div>}>
      <ApprovePostContent />
    </Suspense>
  );
};

export default ApprovePostPage;
