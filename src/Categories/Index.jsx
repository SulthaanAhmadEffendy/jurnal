import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';

function Index() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get(
        'https://journal.bariqfirjatullah.pw/api/category',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `https://journal.bariqfirjatullah.pw/api/category/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Category deleted successfully.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      fetchCategories();
    } catch (error) {
      console.log('Error deleting category:', error);
    }
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure to deleting this category')) {
      deleteCategory(id);
    }
  };

  return (
    <Card className=''>
      <div className='text-center  m-5 font-bold '>CRUD CATEGORY</div>
      <div className='container mx-auto'>
        <div className='flex justify-center mb-3'>
          <Link
            to='add'
            className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Add New Category
          </Link>
        </div>
        <CardBody>
          <div className='overflow-x-auto flex justify-center'>
            <table className='bg-white shadow-md rounded-lg overflow-hidden'>
              <thead className='bg-gray-800 text-white'>
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
                          to={`edit/${item.id}`}
                          className='text-yellow-300 hover:text-yellow-700 mr-4'
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
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
        </CardBody>
      </div>
      {message && <p className='text-green-500 text-center mt-4'>{message}</p>}
    </Card>
  );
}

export default Index;
