
"use client";

import React, { useState } from 'react';
import PostPreview from '../PostPreview';

const NewInstagramPostPage = () => {

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [caption, setCaption] = useState('');

  const [selectedProfile, setSelectedProfile] = useState(''); // Changed from username to selectedProfile

  const [date, setDate] = useState('');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  // Mocked profiles data

  const profiles = [

    { id: 1, name: 'dak.jen' },

    { id: 2, name: 'ben.dashiell' },

  ];



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;

    if (files) {

      if (files.length > 10) {

        alert("You can only upload up to 10 photos.");

        return;

      }



      const newImagePreviews: string[] = [];

      for (let i = 0; i < files.length; i++) {

        const reader = new FileReader();

        reader.onloadend = () => {

          newImagePreviews.push(reader.result as string);

          if (newImagePreviews.length === files.length) {

            setImagePreviews(newImagePreviews);

            setCurrentImageIndex(0);

          }

        };

        reader.readAsDataURL(files[i]);

      }

    }

  };



  const handlePrevImage = () => {

    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1));

  };



  const handleNextImage = () => {

    setCurrentImageIndex((prevIndex) => (prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1));

  };



  return (

    <div className="grid grid-cols-2 gap-8">

      {/* Left Column: Form */}

      <div className="bg-[#b8b8b8] p-8 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold mb-8 text-[#000000] text-center">Create New Post</h1>

        <div className="relative border-2 border-dashed border-[#000000] rounded-lg p-8 text-center h-full flex flex-col justify-center items-center">

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

              <div>

                <p className="text-[#000000] opacity-50 mb-2">Drag and drop images here, or click to select files</p>

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

        <form>

          <div className="mb-4">

            <label className="block text-[#000000] text-sm font-bold mb-2" htmlFor="profile">

              Profile

            </label>

            <select

              id="profile"

              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#000000] leading-tight focus:outline-none focus:shadow-outline"

              value={selectedProfile}

              onChange={(e) => setSelectedProfile(e.target.value)}

            >

              <option value="" disabled>Select a profile</option>

              {profiles.map((profile) => (

                <option key={profile.id} value={profile.name}>

                  {profile.name}

                </option>

              ))}

            </select>

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

        </form>

      </div>

      {/* Right Column: Post Preview */}

      <div className="w-1/2">

        <PostPreview images={imagePreviews} caption={caption} username={selectedProfile} date={date} />

      </div>

    </div>

  );

};



export default NewInstagramPostPage;
