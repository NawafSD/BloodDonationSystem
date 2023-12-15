import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../../supabaseClient.js';

export default function ProcessRequest() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [recipientIdInput, setRecipientIdInput] = useState('');
  const [recipientData, setRecipientData] = useState({ id: '', name: '', bloodType: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cost, setCost] = useState('');
  const [donatedAmount, setDonatedAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blooddrives')
          .select('title');

        if (error) throw error;

        setEvents(data.map((event) => ({
          id: event.title,
          name: event.title
        })));
      } catch (error) {
        console.error('Error fetching events:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

// Fetch recipient's details based on ID
  const fetchRecipientDetails = async () => {
    if (!recipientIdInput) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('name, bloodtype')
        .eq('userid', recipientIdInput)
        .single();

      if (error) throw error;

      setRecipientData({
        id: recipientIdInput,
        name: data.name,
        bloodType: data.bloodtype,
      });
    } catch (error) {
      console.error('Error fetching recipient details:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchRecipientDetails();
    
  }, [recipientIdInput]);


  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleRecipientIdChange = (event) => {
    setRecipientIdInput(event.target.value);
    setShowSuggestions(true);
  };

  const handleSelectRecipient = (recipient) => {
    setRecipientIdInput(recipient.id);
    setRecipientData(recipient);
    setShowSuggestions(false);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setDonatedAmount(event.target.value);
  };

  // Submit handler
const handleSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true);

  try {
    // Fetch requester's name
    const requesterID = Cookies.get('userID');
    const { data: requesterData, error: requesterError } = await supabase
      .from('users')
      .select('name')
      .eq('userid', requesterID)
      .single();

    if (requesterError) throw requesterError;

    // Find the blooddriveid matching the selected event title
    const { data: blooddriveData, error: blooddriveError } = await supabase
      .from('blooddrives')
      .select('blooddriveid')
      .eq('title', selectedEvent)
      .single();

    if (blooddriveError) throw blooddriveError;

    // Prepare data for the donations table
    const donationData = {
      blooddriveid: blooddriveData.blooddriveid,
      userid: recipientIdInput,
      type: 'Request for Donate',
      from: requesterData.name,
      date: new Date().toISOString().split('T')[0],
      cost,
      donatedamount: donatedAmount
    };

    // Insert data into the donations table
    const { error: donationError } = await supabase
      .from('donations')
      .insert([donationData]);

    if (donationError) throw donationError;

    console.log('Request submitted successfully');
    // Reset form or navigate to another page

  } catch (error) {
    console.error('Error processing request:', error.message);
  } finally {
    setIsLoading(false);
  }
};


  // ... existing return statement
  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center justify-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Process For Blood Request</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedEvent}
              onChange={handleEventChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipient ID
            </label>
            <input
              type="text"
              value={recipientIdInput}
              onChange={handleRecipientIdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter ID"
            />
  
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={recipientData.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
            </div>


        <div className="flex gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Blood Type
            </label>
            <input
              type="text"
              value={recipientData.bloodType}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cost
            </label>
            <input
              type="text"
              value={cost}
              onChange={handleCostChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter cost"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Donated Amount (Liters)
            </label>
            <input
              type="text"
              value={donatedAmount}
              onChange={handleQuantityChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter amount in liters"
              required
            />
          </div>
        </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};