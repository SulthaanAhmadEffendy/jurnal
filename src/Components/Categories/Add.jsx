import React, { useState } from 'react';
import axios from 'axios';

function Add() {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://journal.bariqfirjatullah.pw/api/category',
        { name: categoryName },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Kategori berhasil ditambahkan!');
        setCategoryName('');
      } else {
        setMessage(
          `Gagal menambahkan kategori. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage(`Terjadi kesalahan: ${error.message}`);
    }
  };

  return (
    <div className='p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-lg font-semibold mb-4'>Tambah Kategori</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='categoryName'
            className='text-left text-gray-700 mb-2 p-5'
          >
            Nama Kategori
          </label>
          <input
            type='text'
            id='categoryName'
            value={categoryName}
            onChange={handleInputChange}
            className='w-56 px-3 py-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Tambah
        </button>
      </form>
      {message && <p className='mt-4 text-green-500'>{message}</p>}
    </div>
  );
}

export default Add;
