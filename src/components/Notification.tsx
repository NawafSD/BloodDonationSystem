import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { supabase } from '../../supabaseClient.js';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userID = Cookies.get('userID');
      if (!userID) return;

      let { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('userid', userID);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      const transformedData = data.map((item) => ({
        ...item,
        type: "Request for Donate",
        from: item.from,
        date: item.date,
        cost: item.cost
      }));

      setNotifications(transformedData);
    };

    fetchNotifications();
  }, []);

  const handlePay = async (notification) => {
    try {
      const userID = Cookies.get('userID');
      if (!userID) throw new Error("User ID not found");
  
      // Fetch the user's name from the 'users' table
      let { data: userData, error: userError } = await supabase
        .from('users')
        .select('name')
        .eq('userid', userID)
        .single();
  
      if (userError) throw userError;
      if (!userData) throw new Error("User not found");
  
      const recipientName = userData.name;
  
      // Proceed with the existing payment insertion
      const { error } = await supabase
        .from('payments')
        .insert([{
            recipientname: recipientName,
            amount: notification.cost,
            confirmationdate: notification.date
        }]);
  
      if (error) throw error;
  
      window.location.href = '/PaymentPage'; // Modify the URL as needed
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Notification Center</h1>

        <div className="flex justify-center w-full">
          <img 
            src="src/assets/notification-bell.gif" 
            alt="Notification Center" 
            className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24" 
          />
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-center">Type</th>
              <th className="px-5 py-3 text-center">From</th>
              <th className="px-5 py-3 text-center">Date</th>
              <th className="px-5 py-3 text-center">Cost</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index} className="border-b">
                <td className="px-5 py-3 text-center">{notification.type}</td>
                <td className="px-5 py-3 text-center">{notification.from}</td>
                <td className="px-5 py-3 text-center">{notification.date}</td>
                <td className="px-5 py-3 text-center">{notification.cost}</td>
                <td className="px-5 py-3 text-center">
                  <button
                    className="px-7 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => handlePay(notification)}
                  >
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
