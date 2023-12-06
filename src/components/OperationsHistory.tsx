import React, { useState, useEffect } from 'react';

export default function OperationsHistory() {
  const sampleDataFromBackend = [
    { type: 'Donate', toFrom: 'Ali Alabdulal', date: '22/11/2023' },
    { type: 'Donate', toFrom: 'Hassan Alabdulal', date: '02/09/2021' },
    { type: 'Recipient', toFrom: 'Abdullah Al Matawah', date: '17/12/2020' },
  ];

  const [operations, setOperations] = useState([]);

  useEffect(() => {
    // Here you would fetch the data from the backend
    // For now, we'll use the sample data
    setOperations(sampleDataFromBackend);
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8 m-6">
      <h1 className="text-2xl font-semibold text-gray-900">Operations History</h1>
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
  );
}
