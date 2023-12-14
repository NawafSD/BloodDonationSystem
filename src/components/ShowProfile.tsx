import React, { useState, useEffect } from 'react';
import OperationsHistory from '../components/OperationsHistory';
import { supabase } from '../../supabaseClient.js';
import Cookies from 'js-cookie';


const ShowProfile = () => {
 // Initialize state
  const [userProfile, setUserProfile] = useState({
    userID: 0,
    name: '',
    email: '',
    phoneNumber: '',
    bloodType: '',
    dateOfBirth: '',
    age: 0,
    weight: 0,
    address: '',
    medicalHistory: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userID = Cookies.get('userID');
      console.log(userID)

      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('userid', userID)
        .single();

      if (userError) console.error(userError);
      else {
        // Fetch medical history data
        const { data: medicalData, error: medicalError } = await supabase
          .from('medicalhistory')
          .select('*')
          .eq('userid', userID)
          .single();

        if (medicalError) console.error(medicalError);
        else {
          // Calculate age
          const age = calculateAge(userData.dateofbirth);

          // Update state
          setUserProfile({
            userID,
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phonenumber,
            bloodType: userData.bloodtype,
            dateOfBirth: userData.dateofbirth,
            age,
            weight: userData.weight,
            address: userData.address,
            medicalHistory: medicalData.diseases
          });
        }
      }
    };

    fetchUserData();
  }, []);

  // Helper function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };


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
                {userProfile.userID}
              </div>
            </div>

               {/* Name */}
               <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {userProfile.name}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {userProfile.email}
                </div>
              </div>
              <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +966
            </span>
            <div className="flex-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-none rounded-r-md">
              {userProfile.phoneNumber}
            </div>
          </div>
        </div>
      </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {userProfile.bloodType}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {userProfile.weight}
                </div>
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {userProfile.dateOfBirth}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                  {userProfile.age}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {userProfile.address}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <div className="mt-1 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                {userProfile.medicalHistory}
              </div>
              {userProfile.medicalHistory === 'Other' && (
                <div className="mt-4 block w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md">
                </div>
              )}
            </div>

          <div className="flex flex-col items-center space-y-2"> {/* Flex container with column direction */}
              {/* Update Profile Button */}
              <a
                className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[170px] text-center"
                href="EditProfileUserPage"
              >
                Update Profile
              </a>

              </div>


          </div>
        </div>
      </div>

      <div className="w-full h-1/2 flex items-start justify-start -mb-56">
        <OperationsHistory />
        </div>
    </div>
  );
};

export default ShowProfile;