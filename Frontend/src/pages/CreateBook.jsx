import React from 'react'
import { useState } from 'react';


export default function CreateBook() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create/Add Book 
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Book Name'
            className='border p-3 rounded-lg'
            id='book_name'
            maxLength='80'
            minLength='8'
            required
          />
          <input
            type='text'
            placeholder='Author Name'
            className='border p-3 rounded-lg'
            id='author_name'
            maxLength='65'
            minLength='5'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Pick-up Address'
            className='border p-3 rounded-lg'
            id='pick_up_address'
            required
          />
          <input
            type='text'
            placeholder='Your Name'
            className='border p-3 rounded-lg'
            id='user_name'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='sale'
                className='w-5'
                name="select"
              />
              <label>Sell</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='rent'
                className='w-5'
                name="select"
              />
              <label>Rent</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'> (Rs / month)</span>
              </div>
            </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  <span className='text-xs'> (Rs / month)</span>
                </div>
              </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover page of book  (max 6 images)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              upload
            </button>
          </div>
          <p className='text-red-700 text-sm'>
          </p>
        <button
            className='p-3 bg-red-600 text-white font-medium rounded-lg uppercase hover:opacity-90 disabled:opacity-80'
          >
            Create Book
          </button>
          {/* {error && <p className='text-red-700 text-sm'>{error}</p>} */}
        </div>
      </form>
    </main>
  );

}
