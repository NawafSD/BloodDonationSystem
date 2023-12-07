import React, { useState } from 'react';

export default function ProcessRequest() {
  const [events] = useState([
    { id: 'event1', name: 'Annual Blood Drive' },
    { id: 'event2', name: 'Community Blood Donation' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [recipientIdInput, setRecipientIdInput] = useState('');
  const [recipientData, setRecipientData] = useState({ id: '', name: '', bloodType: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cost, setCost] = useState('');

  const recipients = [
    { id: '1112223334', name: 'John Doe', bloodType: 'A+' },
    { id: '2223334445', name: 'Jane Smith', bloodType: 'O-' },
    { id: '5775775588', name: 'John Doe', bloodType: 'A+' },
    { id: '3892974858', name: 'Jane Smith', bloodType: 'O-' },
    { id: '7900482028', name: 'John Doe', bloodType: 'A+' },
    { id: '8494004284', name: 'Jane Smith', bloodType: 'O-' },
    // ... more recipients
  ];

  // Filter recipients based on the input
  const filteredRecipients = recipients.filter(r => r.id.includes(recipientIdInput));

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission
    console.log({
      selectedEvent,
      recipientData,
      cost
    });
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Process For Blood Request</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipient ID
            </label>
            <input
              type="text"
              value={recipientIdInput}
              onChange={handleRecipientIdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter ID"
            />
            {showSuggestions && (
              <ul className="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
                {filteredRecipients.map((recipient) => (
                  <li
                    key={recipient.id}
                    onClick={() => handleSelectRecipient(recipient)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {recipient.id}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={recipientData.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Blood Type
            </label>
            <input
              type="text"
              value={recipientData.bloodType}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter cost"
              required
            />
          </div>

          <div className="flex items-center justify-between">
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
}
