import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody } from '@material-tailwind/react';

const IndexJr = () => {
  const [journals, setJournals] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        'https://journal.bariqfirjatullah.pw/api/journal',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response from API:', response.data);
      setJournals(response.data.data.data || []);
    } catch (error) {
      console.error('Failed to fetch journals:', error);
      setJournals([]);
    }
  };

  const deleteJournal = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `https://journal.bariqfirjatullah.pw/api/journal/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Journal deleted successfully.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      fetchJournals();
    } catch (error) {
      console.log('Error deleting journal:', error);
    }
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure to delete this journal?')) {
      deleteJournal(id);
    }
  };

  return (
    <Card>
      <div className='text-center m-5 font-bold'>Journals</div>
      <div className='container mx-auto'>
        <div className='flex justify-center mb-3'>
          <Link
            to='add'
            className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Add New Journal
          </Link>
        </div>
        <CardBody>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[320px] table-auto rounded-lg'>
              <thead className='bg-gray-800 text-white rounded-t-lg'>
                <tr>
                  <th className='py-3 px-4 text-left'>Start At</th>
                  <th className='py-3 px-4 text-left'>End At</th>
                  <th className='py-3 px-4 text-left'>Category</th>
                  <th className='py-3 px-4 text-left'>Description</th>
                  <th className='py-3 px-4 text-left'>Status</th>
                  <th className='py-3 px-4 text-left'>Action</th>
                </tr>
                {console.log(journals)}
              </thead>
              <tbody>
                {journals.length ? (
                  journals.map((item) => (
                    <tr key={item.id} className='border-t'>
                      <td className='py-3 px-4'>{item.start_at}</td>
                      <td className='py-3 px-4'>{item.end_at}</td>
                      <td className='py-3 px-4'>{item.category.name}</td>
                      <td className='py-3 px-4'>{item.description}</td>
                      <td className='py-3 px-4'>{item.status}</td>
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
                    <td colSpan='6' className='text-center py-4'>
                      No Journals Found.
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
};

export default IndexJr;
