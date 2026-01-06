"use client";

import React, { useState, useEffect, useCallback } from 'react';
import PostPreview from '../../PostPreview';

interface SocialProfile {
  id: number;
  username: string;
  platform: string;
}



const NewInstagramPostPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(''); // Changed to selectedProfileId
  const [date, setDate] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [socialProfiles, setSocialProfiles] = useState<SocialProfile[]>([]); // State for fetched social profiles
    const [fetchingProfiles, setFetchingProfiles] = useState(true);
  
    // Fetch social media profiles on component mount
    const fetchSocialProfiles = useCallback(async () => {
      setFetchingProfiles(true);
      try {
        const response = await fetch('/api/profiles');
        if (!response.ok) {
          throw new Error('Failed to fetch social media profiles');
        }
        const data: SocialProfile[] = await response.json();
        setSocialProfiles(data);
        if (data.length > 0) {
          setSelectedProfileId(String(data[0].id)); // Select first profile by default
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetchingProfiles(false);
      }
    }, []);
  
    useEffect(() => {
      fetchSocialProfiles();
    }, [fetchSocialProfiles]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 10) {
        alert("You can only upload up to 10 photos.");
        return;
      }

      const newImageFiles = Array.from(files);
      setImageFiles(newImageFiles);

      const newImagePreviews: string[] = [];
      for (let i = 0; i < newImageFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImagePreviews.push(reader.result as string);
          if (newImagePreviews.length === newImageFiles.length) {
            setImagePreviews(newImagePreviews);
            setCurrentImageIndex(0);
          }
        };
        reader.readAsDataURL(newImageFiles[i]);
      }
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit started');
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('profileId', selectedProfileId);
    formData.append('caption', caption);
    formData.append('date', date);
    for (const imageFile of imageFiles) {
      formData.append('images', imageFile);
    }

    console.log('Sending FormData to /api/posts');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      console.log('Received response from /api/posts:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.error || 'Failed to create post');
      }

      const result = await response.json();
      console.log('Post created:', result.post);
      setSuccess(true);
      setCaption('');
      setSelectedProfileId('');
      setDate('');
      setImageFiles([]);
      setImagePreviews([]);
      setCurrentImageIndex(0);
      if (socialProfiles.length > 0) {
        setSelectedProfileId(String(socialProfiles[0].id));
      }
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      console.log('handleSubmit finished');
      setLoading(false);
    }
  };

  const selectedProfileUsername = socialProfiles.find(p => String(p.id) === selectedProfileId)?.username || 'N/A';

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8"> {/* Changed to flex-row for two columns */}
        {/* Left Column: Post Preview */}
        <div className="md:w-1/2"> {/* Adjusted width for two columns */}
          <PostPreview images={imagePreviews} caption={caption} username={selectedProfileUsername} date={date} />
        </div>

        {/* Right Column: Form */}
        <div className="md:w-1/2 bg-[#b8b8b8] p-8 rounded-lg shadow-md"> {/* Adjusted width for two columns */}
          <h1 className="text-2xl font-bold mb-8 text-[#000000] text-center">Create New Post</h1>
          {/* Image Upload Box */}
          <div className="relative border-2 border-dashed border-[#000000] rounded-lg p-4 md:p-8 text-center flex flex-col justify-center items-center overflow-hidden w-full max-w-md mx-auto max-h-96 mb-4">
            {imagePreviews.length > 0 ? (
              <div className="h-full w-full">
                <div className="relative">
                  <img src={imagePreviews[currentImageIndex]} alt="Preview" className="max-h-64 w-full object-contain rounded-lg" />
                  {imagePreviews.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        &#10094;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className={`h-20 w-20 object-cover rounded-lg cursor-pointer ${
                        index === currentImageIndex ? 'border-2 border-[#740403]' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative">
                <p className="text-[#000000] opacity-50 mb-2 text-wrap">Drag and drop images here, or click to select files</p>
                <input
                  type="file"
                  id="image"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  className="bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded"
                  onClick={() => document.getElementById('image')?.click()}
                >
                  Select from computer
                </button>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="profile">
                Social Media Profile
              </label>
              {fetchingProfiles ? (
                <p>Loading profiles...</p>
              ) : socialProfiles.length > 0 ? (
                <select
                  id="profile"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedProfileId}
                  onChange={(e) => setSelectedProfileId(e.target.value)}
                >
                  {socialProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.username} ({profile.platform})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">No social media profiles found. Please create one on the profiles page.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="caption">
                Caption
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline h-32 placeholder-[#000000] placeholder-opacity-50"
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#740403] hover:bg-[#d2232a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Create Post'}
            </button>
            {success && <p className="text-green-500 mt-2">Post created successfully!</p>}
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewInstagramPostPage;