import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient.js';
import Cookies from 'js-cookie';
import { navigate } from "astro/transitions/router";


export default function EditProfileUser() {
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

  // State variables for editable fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  useEffect(() => {
    // ... existing useEffect logic
    // After fetching, set the editable fields
    setPhoneNumber(userProfile.phoneNumber);
    setWeight(userProfile.weight);
    setAddress(userProfile.address);
    setMedicalHistory(userProfile.medicalHistory);
  }, [userProfile]); // Add userProfile as a dependency

  const handleNumericInputChange = (setterFunction, maxLength) => (event) => {
    const value = event.target.value;
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= maxLength) {
      setterFunction(value);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Handle form submission
  const handleSubmit = async (event) => {
    const userID = Cookies.get('userID');
    event.preventDefault();

    // Update user data
    const { error: updateUserError } = await supabase
      .from('users')
      .update({ phonenumber: phoneNumber, weight, address })
      .eq('userid', userID);

    if (updateUserError) {
      console.error('Error updating user data:', updateUserError);
    } else {
      // Update medical history data
      const { error: updateMedicalError } = await supabase
        .from('medicalhistory')
        .update({ diseases: medicalHistory })
        .eq('userid', userID);

      if (updateMedicalError) {
        console.error('Error updating medical history:', updateMedicalError);
      } else {
        console.log('Profile updated successfully');
        navigate('/ShowProfilePage');
      }
    }
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Fixed Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="user-id">User ID</label>
                <input
                className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                id="user-id"
                type="text"
                value={userProfile.userID}
                disabled
                />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border-2 border-black bg-gray-200 text-gray-700 rounded-md"
                  id="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="blood-type">Blood Type</label>
                <select
                  id="blood-type"
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border-2 border-black bg-gray-200 text-gray-700 rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="date-of-birth"
                  type="date"
                  value={userProfile.dateOfBirth}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="age">Age</label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
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
                    className="mt-1 block w-full px-3 py-2 border-2 border-black bg-gray-200 text-gray-700 rounded-md resize-none"
                    id="address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical-history">Medical History</label>
                <textarea
                  id="medical-history"
                  className="mt-1 block w-full px-3 py-2 border-2 border-black bg-gray-200 text-gray-700 rounded-md"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                />
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
            <button
              type="submit"
              className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[170px] text-center"
              href="ShowProfilePage"
            >
              Save Changes
            </button>

          </div>

          </form>
        </div>
      </div>
    </div>
  );
}