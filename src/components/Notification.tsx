import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const NotificationItem = ({ notification, onAccept }) => {
  const buttonClass = notification.isProcessing
    ? "px-4 py-2 bg-blue-300 text-white rounded opacity-50 cursor-not-allowed" // Dim the button if processing
    : "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300";

  return (
    <tr className="border-b">
      <td className="px-5 py-3 text-center">{notification.type}</td>
      <td className="px-5 py-3 text-center">{notification.from}</td>
      <td className="px-5 py-3 text-center">{notification.date}</td>
      <td className="px-5 py-3">
        <div className="flex justify-center items-center" style={{ height: '50px' }}>
          {notification.isCompleted ? (
            <p>{notification.completedMessage}</p>
          ) : notification.isProcessing ? (
            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
          ) : (
            <button
              className={buttonClass}
              onClick={() => onAccept(notification)}
              disabled={notification.isProcessing}
            >
              Accept
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Request for Recipient',
      from: 'Hassan Alabdulal',
      date: '24/05/2023',
      isCompleted: false,
      isProcessing: false,
    },
    {
      id: 2,
      type: 'Request for Donate',
      from: 'Abdullah Al Matawah',
      date: '23/05/2023',
      isCompleted: false,
      isProcessing: false,
    },
    // ... more notifications
  ]);

  const handleAccept = (acceptedNotification) => {
    // Update the notification to show the checkmark temporarily
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === acceptedNotification.id
          ? { ...notification, isProcessing: true }
          : notification
      )
    );

    // Simulate a 3-second processing delay
    setTimeout(() => {
      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => {
          if (notification.id === acceptedNotification.id) {
            return {
              ...notification,
              isCompleted: true,
              isProcessing: false,
              completedMessage:
                acceptedNotification.type === 'Request for Recipient'
                  ? `The process of donating blood to ${notification.from} was completed successfully.`
                  : `The process of receiving blood from ${notification.from} was completed successfully.`,
            };
          }
          return notification;
        })
      );
    }, 3000);
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Notification Center</h1>

        <div className="flex justify-center w-full">
          <img src="src/assets/notification-bell.gif" alt="Notification Center" className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24" />
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-center">Type</th>
              <th className="px-5 py-3 text-center">From</th>
              <th className="px-5 py-3 text-center">Date</th>
              <th className="px-5 py-3 text-center width[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
