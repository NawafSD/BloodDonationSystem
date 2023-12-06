import React, { useState, useEffect } from 'react';

export default function ShowProfile() {
  // Example user profile data
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

  // Initialize state with the example user profile data
  const [userId] = useState(userProfile.userId);
  const [name] = useState(userProfile.name);
  const [email] = useState(userProfile.email);
  const [phoneNumber] = useState(userProfile.phoneNumber);
  const [bloodType] = useState(userProfile.bloodType);
  const [dateOfBirth] = useState(userProfile.dateOfBirth);
  const [age] = useState(userProfile.age);
  const [weight] = useState(userProfile.weight);
  const [address] = useState(userProfile.address);
  const [medicalHistory] = useState(userProfile.medicalHistory);
  const [otherMedicalHistory] = useState(userProfile.otherMedicalHistory);


  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

        {/* Display of User Details */}
        <div className="w-full">
          <div className="space-y-4">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {userId}
              </div>
            </div>

               {/* Name */}
               <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {name}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {email}
                </div>
              </div>
              <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +966
            </span>
            <div className="flex-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-none rounded-r-md">
              {phoneNumber}
            </div>
          </div>
        </div>
      </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {bloodType}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {weight}
                </div>
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {dateOfBirth}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {age}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {address}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {medicalHistory}
              </div>
              {medicalHistory === 'Other' && (
                <div className="mt-4 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {otherMedicalHistory}
                </div>
              )}
            </div>

          <div className="flex flex-col items-center space-y-2"> {/* Flex container with column direction */}
              {/* Update Profile Button */}
              <a
                className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[170px] text-center"
                href="EditProfilePage"
              >
                Update Profile
              </a>

              </div>


          </div>
        </div>
      </div>


    </div>
  );
}
