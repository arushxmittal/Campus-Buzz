import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMapPin, faBookmark } from '@fortawesome/free-solid-svg-icons';

/**
 * A reusable card component for displaying event info.
 * It now parses the `event.date` string.
 */
const EventCard = ({ event, onRegister }) => {
  const [isBookmarked, setIsBookmarked] = useState(event.bookmarked);

  // --- NEW: Parse date and time from event object ---
  const dateObj = new Date(event.date + 'T00:00:00'); // Use T00:00:00 to avoid timezone shifts
  const day = dateObj.getUTCDate();
  const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
  
  // Format time from "HH:MM" (e.g., "14:00") to "2:00 PM"
  const timeString = event.time;
  let [hours, minutes] = timeString.split(':');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      )}
      <div className="flex">
        <div className={`w-1/4 p-6 bg-gradient-to-br ${event.colorClass} flex flex-col items-center justify-center`}>
          <div className="text-center">
            {/* --- MODIFIED: Use new date variables --- */}
            <div className={`text-3xl font-bold ${event.textClass}`}>{day}</div>
            <div className="text-sm text-gray-600">{month}</div>
          </div>
          <div className="mt-4 text-center">
            {/* --- MODIFIED: Use new time variable --- */}
            <div className="text-sm font-medium text-gray-700">{formattedTime}</div>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
            <div className="flex items-center space-x-2 mb-2">
                {Array.isArray(event.tags) && event.tags.map(tag => (
                <span key={tag.name} className={`${tag.color} text-xs font-medium px-2 py-1 rounded`}>
                    {tag.name}
                </span>
                ))}
            </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
            </div>
            <button onClick={() => setIsBookmarked(!isBookmarked)} className={isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-600'}>
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUsers} className="text-gray-400" />
              <span className="text-sm text-gray-600">{event.attending} attending</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapPin} className="text-gray-400" />
              <span className="text-sm text-gray-600">{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div/> 
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onRegister(event)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
              >
                Register
              </button>
              
              <Link 
                to={`/event/${event.id}`}
                className={`px-6 py-2 ${event.buttonColor} text-white rounded-lg hover:opacity-90 transition-all`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;