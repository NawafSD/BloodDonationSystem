import React, { useState, useEffect } from 'react';

export default function EditProfile() {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [otherMedicalHistory, setOtherMedicalHistory] = useState('');

  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age_now = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      setAge(age_now);
    }
  }, [dateOfBirth]);

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const diseasesPreventingDonation = [
    'None',
    'Hepatitis B or C',
    'HIV/AIDS',
    'Heart Disease',
    'Hemochromatosis',
    'Blood Cancers',
    'Other' // When 'Other' is selected, a text box will appear for the user to specify
  ];

  const handleNumericInputChange = (setterFunction, maxLength) => (event) => {
    // Check if the input value is numeric and set the state
    const value = event.target.value;
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= maxLength) {
        setterFunction(value);
      }
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>

        {/* Form for User Details */}
        <div className="w-full">
          <form className="space-y-4">
            {/* User ID */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="user-id">
                User ID
                </label>
                <input
                className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                id="user-id"
                type="number"
                value={userId}
                onChange={handleNumericInputChange(setUserId, 10)}
                placeholder="User ID"
                />
            </div>

            {/* First and Last Name */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="phone-number">
                  Phone Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +966
                  </span>
                  <input
                    type="tel"
                    className="flex-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-none rounded-r-md"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={handleNumericInputChange(setPhoneNumber, 10)}
                    placeholder="5X XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Blood Type and Weight */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="blood-type">
                  Blood Type
                </label>
                <select
                  id="blood-type"
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                 <option value="">Select Blood Type</option>
                    {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                    ))}
                </select>
                </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="weight">
                  Weight (kg)
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={handleNumericInputChange(setWeight, 3)}
                  placeholder="Weight"
                />
              </div>
            </div>

            {/* Date of Birth and Age */}
            <div className="flex gap-4">
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="date-of-birth">
                    Date of Birth
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                    id="date-of-birth"
                    type="date"
                    max={getMaxDate()} // Prevent future dates
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                </div>
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="age">
                    Age
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                    id="age"
                    type="text"
                    value={age}
                    disabled
                />
                </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                Address
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md resize-none"
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="medical-history">
                Medical History
              </label>
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
            <button
              type="submit"
              className="bg-[#5f7fbf] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-[#3e60a3] transition-all duration-700 min-w-[170px]"
            >
              Update Profile
            </button>

          </div>

          </form>
        </div>
      </div>
    </div>
  );
}