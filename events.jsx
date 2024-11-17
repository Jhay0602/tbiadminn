import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddEvent = ({ addEvent, closeForm, selectedDate }) => {
  const [eventData, setEventData] = useState({
    name: '',
    startTime: '06:00 AM',
    endTime: '07:00 AM',
    eventDate: selectedDate,
    audience: '',
  });

  const handleSubmit = () => {
    addEvent(eventData);
    closeForm();
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
        <form>
          <div>
            <input
              type="text"
              placeholder="Event Name"
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"
            />
          </div>
          <div>
            <input
              type="time"
              value={eventData.startTime}
              onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"
            />
          </div>
          <div>
            <input
              type="time"
              value={eventData.endTime}
              onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"
            />
          </div>
          <div>
            <select
              value={eventData.audience}
              onChange={(e) => setEventData({ ...eventData, audience: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"
            >
              <option value="">Select Audience</option>
              <option value="guest">Guest</option>
              <option value="incubatees">Incubatees</option>
              <option value="investors">Investors</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Event
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [view, setView] = useState('daily');
  const [highlightedDate, setHighlightedDate] = useState(null);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const getDateKey = (date) => {
    return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  };

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
  ];

  const getDayLabelsAndDates = (selectedDate) => {
    let dayLabelsAndDates = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + i);
      const day = newDate.toLocaleString('en-US', { weekday: 'short' });
      const date = newDate.getDate();
      dayLabelsAndDates.push({ day, date, fullDate: newDate });
    }
    return dayLabelsAndDates;
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const handleDateClick = (date) => {
    setHighlightedDate(date);
    setSelectedDate(date);
  };

  return (
    <div className="bg-white min-h-screen flex">
      <div className="w-1/4 p-6 space-y-8">
        <div className="border border-gray-300 rounded-lg shadow-lg">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="h-[300px] w-[300px] mx-auto"
            tileClassName={({ date, view }) => {
              if (highlightedDate && getDateKey(date) === getDateKey(highlightedDate)) {
                return 'bg-blue-500 text-white'; // Highlight the selected date
              }
            }}
            onClickDay={handleDateClick}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Time Zone: UTC</h3>
          <p className="text-sm text-gray-500">Displaying events in your local timezone.</p>
        </div>
      </div>

      <div className="w-3/4 p-8">
        <div className="border border-gray-300 rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add New Event
            </button>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-lg font-semibold">
              {selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={handleTodayClick}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar Table with Time Slots */}
        <div className="overflow-x-auto">
          <table
            className="min-w-full table-auto border border-gray-300 border-separate border-spacing-0"
            style={{ tableLayout: 'fixed' }}
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left border-b border-gray-300" style={{ width: '120px' }}>
                  Time
                </th>
                {getDayLabelsAndDates(selectedDate).map((dayLabel, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-3 text-center border-b border-gray-300 ${
                      highlightedDate && getDateKey(dayLabel.fullDate) === getDateKey(highlightedDate)
                        ? 'bg-blue-300'
                        : ''
                    }`}
                    style={{ borderLeft: '1px solid #e5e5e5', width: '14%' }}
                  >
                    <div>{dayLabel.date}</div>
                    <div className="text-sm text-gray-500">{dayLabel.day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, idx) => (
                <tr key={idx} className="text-left border-b border-gray-300">
                  <td className="px-2 py-8" style={{ fontSize: '0.75rem' }}>
                    {timeSlot}
                  </td>
                  {getDayLabelsAndDates(selectedDate).map((dayLabel, dayIdx) => {
                    const eventsForDay = events.filter(
                      (event) =>
                        new Date(event.eventDate).toDateString() ===
                          dayLabel.fullDate.toDateString() && event.startTime === timeSlot
                    );
                    return (
                      <td
                        key={dayIdx}
                        className="px-4 py-2 text-left border-l border-gray-300"
                        style={{ minHeight: '50px' }}
                      >
                        {eventsForDay.map((event, eventIdx) => (
                          <div key={eventIdx} className="mb-2 bg-blue-100 p-2 rounded">
                            <div className="font-semibold">{event.name}</div>
                            <div className="text-sm text-gray-600">{event.audience}</div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <AddEvent
          addEvent={addEvent}
          closeForm={() => setShowAddForm(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default EventsPage;
