import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function AddCollectionDrive() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateEndDate = (months) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + months);
    return start.toISOString().split('T')[0];
  };

  const handleDurationChange = (months) => {
    if (startDate) {
      setEndDate(calculateEndDate(months));
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If a duration is already selected, calculate the end date again
    if (endDate) {
      const durationMonths = endDate === calculateEndDate(3) ? 3 : 6;
      setEndDate(calculateEndDate(durationMonths));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Submit form data to server or state management
    const {data: userInsertData, error: userInsertError} = await supabase
      .from("blooddrives")
      .insert([{
        title,
        location,
        bankId: 1,
        start_date: startDate,
        end_date: endDate,
        totaldonations: 0
      }])

      if (userInsertError) {
        console.error("Error inserting data into users table: ", userInsertError)
        return; // Stop the process if there is an error
      }

      else {
        console.log("Blood drive data inserted successfully")
      }
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">New Collection Drive</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="title" className="text-gray-700">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="text-gray-700">Location:</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="start-date" className="text-gray-700">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
              required
            />
          </div>

          <fieldset className="mb-4">
  <legend className="text-gray-700">Duration:</legend>
  <div className="flex flex-col gap-4 md:flex-row">
    <div className="flex items-center">
      <input
        type="radio"
        name="duration"
        value="3 months"
        id="duration-3months"
        className="form-radio h-4 w-4"
        onChange={() => handleDurationChange(3)}
      />
      <label htmlFor="duration-3months" className="ml-2">3 months</label>
    </div>

    <div className="flex items-center">
      <input
        type="radio"
        name="duration"
        value="6 months"
        id="duration-6months"
        className="form-radio h-4 w-4"
        onChange={() => handleDurationChange(6)}
      />
      <label htmlFor="duration-6months" className="ml-2">6 months</label>
    </div>
  </div>
</fieldset>



          <div className="mb-4">
            <label htmlFor="end-date" className="text-gray-700">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              className="w-full px-3 py-2 border rounded shadow-sm"
              disabled
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
