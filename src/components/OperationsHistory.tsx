import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../../supabaseClient.js'; // Import your Supabase client

export default function OperationsHistory() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      const userID = Cookies.get('userID');
      if (!userID) return;

      let { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('userid', userID);

      if (error) {
        console.error('Error fetching operations:', error);
        return;
      }

      // Transform the data
      const transformedData = data.map(item => ({
        type: 'Donate',
        toFrom: item.from,
        date: item.date
      }));

      setOperations(transformedData);
    };

    fetchOperations();
  }, []);

  return (
    <div className="bg-[#f7f7f7] h-screen w-full justify-center flex flex-col items-center">
      <div className="bg-white w-1/2 rounded-lg shadow-lg overflow-hidden p-8 space-y-8 m-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">Operations History</h1>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">To/From</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b border-gray-200 text-center">{operation.type}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">{operation.toFrom}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">{operation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
