import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Index() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        'https://journal.bariqfirjatullah.pw/api/category',
        {
          headers: { Accept: 'application/json' },
        }
      );
      setCategories(data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `https://journal.bariqfirjatullah.pw/api/category/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setMessage('Category deleted successfully.');
      fetchCategories();
    } catch (error) {
      console.log('Error deleting category:', error);
    }
  };

  return (
    <div className=''>
      <h2 className='text-center text-neutral-950 m-5 font-bo'>
        CRUD CATEGORY
      </h2>
      <div className='container mx-auto'>
        <Link
          to='add'
          className='mb-3 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Add New Category
        </Link>
        <div className='overflow-x-auto flex justify-center'>
          <table className='bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-purple-600 text-white'>
              <tr>
                <th className='py-3 px-4 text-left'>Kategori Pekerjaan</th>
                <th className='py-3 px-4 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length ? (
                categories.map((item) => (
                  <tr key={item.id} className='border-t'>
                    <td className='py-3 px-4'>{item.name}</td>
                    <td className='py-3 px-4'>
                      <Link
                        to={`/edit/${item.id}`}
                        className='text-blue-500 hover:text-blue-700 mr-4'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCategory(item.id)}
                        className='text-red-600 hover:text-red-800'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2' className='text-center py-4'>
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {message && <p className='text-green-500 text-center mt-4'>{message}</p>}
    </div>
  );
}

export default Index;
