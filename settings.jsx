import React from 'react';
import { FaCog, FaUser, FaEnvelope, FaLock, FaBell, FaQuestionCircle } from 'react-icons/fa'; // Importing icons

const EventsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaCog size={20} />
            <span>General Settings</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser size={20} />
            <span>Profile</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope size={20} />
            <span>Notifications</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaLock size={20} />
            <span>Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBell size={20} />
            <span>Alerts</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaQuestionCircle size={20} />
            <span>Help & Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
