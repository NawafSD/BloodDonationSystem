import React, { useState, useEffect } from 'react';

export default function EditProfileUser() {
  // Provided user profile data
  const userProfile = {
    userId: '1112223334',
    name: 'Abdullah Mohammed',
    email: 'Abdullah2@gmail.com',
    phoneNumber: '557592000',
    bloodType: 'A+',
    dateOfBirth: '1990-01-01',
    age: '33',
    weight: '70',
    address: '123 Main Street',
    medicalHistory: 'None',
    otherMedicalHistory: ''
  };

  // State variables for editable fields
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber);
  const [weight, setWeight] = useState(userProfile.weight);
  const [address, setAddress] = useState(userProfile.address);
  const [medicalHistory, setMedicalHistory] = useState(userProfile.medicalHistory);
  const [otherMedicalHistory, setOtherMedicalHistory] = useState(userProfile.otherMedicalHistory);

  const handleNumericInputChange = (setterFunction, maxLength) => (event) => {
    const value = event.target.value;
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= maxLength) {
      setterFunction(value);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const diseasesPreventingDonation = [
    'None',
    'Hepatitis B or C',
    'HIV/AIDS',
    'Heart Disease',
    'Hemochromatosis',
    'Blood Cancers',
    'Other'
  ];

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
        <div className="w-full">
          <form className="space-y-4">
            {/* Fixed Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="user-id">User ID</label>
                <input
                className="mt-1 block w-full px-3 py-2 rounded-md"
                id="user-id"
                type="text"
                value={userProfile.userId}
                disabled
                />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
                className="mt-1 block w-full px-3 py-2 rounded-md"
                id="name"
                type="text"
                value={userProfile.name}
                disabled
              />
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                <input
                  className="mt-1 block w-full px-3 py-2 rounded-md"
                  id="email"
                  type="email"
                  value={userProfile.email}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="phone-number">Phone Number</label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={handleNumericInputChange(setPhoneNumber, 10)}
                />
              </div>
            </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="blood-type">Blood Type</label>
                <select
                  id="blood-type"
                  className="mt-1 block w-full px-3 py-2 rounded-md"
                  value={userProfile.bloodType}
                  disabled
                >
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="weight">Weight (kg)</label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={handleNumericInputChange(setWeight, 3)}
                />
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="date-of-birth">Date of Birth</label>
                <input
                  className="mt-1 block w-full px-3 py-2 rounded-md"
                  id="date-of-birth"
                  type="date"
                  value={userProfile.dateOfBirth}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="age">Age</label>
                <input
                  className="mt-1 block w-full px-3 py-2 rounded-md"
                  id="age"
                  type="text"
                  value={userProfile.age}
                  disabled
                />
              </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
                <textarea
                    className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md resize-none"
                    id="address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical-history">Medical History</label>
                <select
                  id="medical-history"
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                >
                  {diseasesPreventingDonation.map((disease) => (
                    <option key={disease} value={disease}>
                      {disease}
                    </option>
                  ))}
                </select>
                {medicalHistory === 'Other' && (
                    <textarea
                      className="mt-4 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md resize-none"
                      id="other-medical-history"
                      rows={3}
                      value={otherMedicalHistory}
                      onChange={(e) => setOtherMedicalHistory(e.target.value)}
                      placeholder="Please specify your medical condition"
                    />
                )}
            </div>

          {/* Button Container */}
          <div className="flex flex-col items-center space-y-2"> {/* Flex container with column direction */}

            {/* Change Password Button */}
            <a
             type="button"
             className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[120px]"
             href="NewPasswordPage"
            >
              Change Password
            </a>

            {/* Update Profile Button */}
            <a
              type="submit"
              className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[170px] text-center"
              href="ShowProfilePage"
            >
              Save Changes
            </a>

          </div>

          </form>
        </div>
      </div>
    </div>
  );
}