import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCategoryById();
  }, []);

  const getCategoryById = async () => {
    try {
      const response = await axios.get(
        `https://journal.bariqfirjatullah.pw/api/category/${id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      setName(response.data.data.name || '');
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://journal.bariqfirjatullah.pw/api/category/${id}`,
        { name },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Category updated successfully.');
        setTimeout(() => {
          setMessage('');
        }, 3000);

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage(
          `Failed to update category. Status code: ${response.status}`
        );
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-lg font-semibold mb-4'>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='categoryName'
            className='text-left text-gray-700 mb-2'
          >
            Category Name
          </label>
          <input
            type='text'
            id='categoryName'
            value={name}
            onChange={handleInputChange}
            className='w-56 px-3 py-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Update
        </button>
      </form>
      {message && <p className='mt-4 text-green-500'>{message}</p>}
    </div>
  );
}

export default Edit;
