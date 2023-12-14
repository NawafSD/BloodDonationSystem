import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function UsersEdit() {
    const initialUsers = [
        { id: '1234567890', name: 'Aaron Smith' },
        { id: '2345678901', name: 'Brenda Johnson' },
        { id: '3456789012', name: 'Charles Brown' },
        { id: '4567890123', name: 'Diana Williams' },
        { id: '5678901234', name: 'Edward Jones' },
        { id: '6789012345', name: 'Fiona White' },
        { id: '7890123456', name: 'George Harris' },
        { id: '8901234567', name: 'Hannah Martin' },
        { id: '9012345678', name: 'Isaac Clark' },
        { id: '0123456789', name: 'Jennifer Lewis' },
        { id: '9012345678', name: 'Hassan Alabdulal' },
        { id: '0123456789', name: 'Abdullah Al Matawah' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRemoveUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const filteredUsers = users.filter(user => 
        user.id.includes(searchTerm) || user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8">
          
              {/* Title */}
              <h1 className="text-2xl font-semibold text-gray-900 text-center w-full mb-4">Users</h1>

              {/* Create New User Button */}
              <div className="self-end mb-4">
                  <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="SignUpPage">
                      Create a new user profile
                  </a>
              </div>

              {/* Search Bar */}
              <div className="w-full flex justify-center mb-4">
                  <div className="relative">
                      <input
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-[#3e60a3] focus:border-[#3e60a3] block w-60 sm:w-80 md:w-96 h-12 text-base border-gray-300 pl-4 pr-10 rounded-lg"
                          placeholder="Search by ID or Name"
                          style={{ backgroundColor: '#ececec' }} // Here we change the background color
                          onChange={handleSearchChange}
                      />
                      <button
                          className="absolute right-0 top-0 mt-3 mr-3"
                          onClick={() => {/* Function to handle search */}}
                      >
                          <FontAwesomeIcon
                            icon={faSearch}
                            size="lg"
                            className="text-gray-600"
                          />
                      </button>
                  </div>
              </div>

                {/* Users Table */}
                <div className="w-full">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-gray-300 text-center px-5 py-3">ID</th>
                                <th className="border-b-2 border-gray-300 text-center px-5 py-3">Name</th>
                                <th className="border-b-2 border-gray-300 text-center px-5 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td className="border-b border-gray-300 px-5 py-3 text-center">{user.id}</td>
                            <td className="border-b border-gray-300 px-5 py-3 text-center">{user.name}</td>
                            <td className="border-b border-gray-300 px-5 py-3">
                                <div className="flex justify-center space-x-2">

                                      {/* History Anchor */}
                                      <a href="OperationsHistoryPage" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                        <FontAwesomeIcon icon={faHistory} className="mr-2" />
                                        History
                                    </a>

                                    {/* Edit Anchor */}
                                    <a href="EditProfileAdminPage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Edit
                                    </a>

                                    {/* Remove Button */}
                                    <button 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                                        onClick={() => handleRemoveUser(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </div>
        </div>
    );
}