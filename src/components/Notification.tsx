import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { supabase } from '../../supabaseClient.js';

const NotificationItem = ({ notification, onAccept, onPay }) => {
  const buttonClass = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300";
  const payButtonClass = "px-7 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors duration-300";

  return (
    
    <tr className="border-b">
      <td className="px-5 py-3 text-center">{notification.type}</td>
      <td className="px-5 py-3 text-center">{notification.from}</td>
      <td className="px-5 py-3 text-center">{notification.date}</td>
      <td className="px-5 py-3">
        <div className="flex justify-center items-center" style={{ height: '50px' }}>
          {notification.isCompleted ? (
            <FontAwesomeIcon icon={faCheck} className="text-green-500 m-11" />
          ) : (
            notification.type === 'Request for Donate' ? (
              <a
                className={payButtonClass}
                onClick={() => onPay(notification)}
                href="PaymentPage"
              >
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                Pay
              </a>
            ) : (
              <button
                className={buttonClass}
                onClick={() => onAccept(notification)}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Accept
              </button>
            )
          )}
        </div>
      </td>
    </tr>
  );
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userID = Cookies.get('userID');
      if (!userID) return;

      let { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('userid', userID);

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = (notification) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notif) =>
        notif.id === notification.id
          ? { ...notif, isCompleted: true }
          : notif
      )
    );
  };

  const handlePay = (notification) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notif) =>
        notif.id === notification.id
          ? { ...notif, isCompleted: true }
          : notif
      )
    );
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Notification Center</h1>

                {/* Image */}
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
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
                onPay={handlePay}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}         

                    

