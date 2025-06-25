import { useState } from 'react';
import dayjs from 'dayjs';

export const Sidebar = ({ currentDate, onDateChange, onAddEvent, events }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '09:00',
    duration: 60,
    description: ''
  });

  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  const years = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = name === 'month'
      ? currentDate.month(months.indexOf(value))
      : currentDate.year(value);
    onDateChange(updatedDate);
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventWithId = {
      ...newEvent,
      id: Math.max(0, ...events.map(e => e.id)) + 1
    };
    onAddEvent(eventWithId);
    setShowEventForm(false);
    setNewEvent({
      title: '',
      date: dayjs().format('YYYY-MM-DD'),
      time: '09:00',
      duration: 60,
      description: ''
    });
  };

  return (
    <div className={`transition-all duration-300 h-full flex flex-col bg-gradient-to-b from-purple-900 to-purple-800 text-purple-50
      ${isExpanded ? 'w-64' : 'w-20'}`}>
      
      {/* Toggle Button - docked at bottom for better UX */}
      <div className="absolute bottom-4 left-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-purple-700 hover:bg-purple-600 text-white p-2 rounded-full shadow"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-3 text-purple-200">📆 Navigate</h3>
            <div className="space-y-2">
              <label className="block text-sm mb-1">Month</label>
              <select
                value={currentDate.format('MMMM')}
                onChange={handleDateChange}
                name="month"
                className="w-full bg-purple-700 text-white border border-purple-600 rounded px-2 py-1 text-sm"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>

              <label className="block text-sm mt-2 mb-1">Year</label>
              <select
                value={currentDate.year()}
                onChange={handleDateChange}
                name="year"
                className="w-full bg-purple-700 text-white border border-purple-600 rounded px-2 py-1 text-sm"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-bold mb-3 text-purple-200">⚡ Quick Actions</h3>
            <button
              onClick={() => onDateChange(dayjs())}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded text-sm mb-2"
            >
              Go to Today
            </button>
            <button
              onClick={() => setShowEventForm(true)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded text-sm"
            >
              Add Event
            </button>
          </div>

          {/* Add Event Form */}
          {showEventForm && (
            <div>
              <h3 className="font-bold mb-3 text-purple-200">📝 New Event</h3>
              <form onSubmit={handleAddEvent} className="space-y-2">
                {['title', 'date', 'time', 'duration', 'description'].map(field => (
                  <div key={field}>
                    <label className="block text-sm mb-1 capitalize">{field}</label>
                    {field === 'description' ? (
                      <textarea
                        name={field}
                        rows="2"
                        value={newEvent[field]}
                        onChange={handleEventInputChange}
                        className="w-full bg-purple-700 border border-purple-600 rounded px-2 py-1 text-sm text-white"
                      />
                    ) : (
                      <input
                        type={field === 'duration' ? 'number' : field}
                        name={field}
                        value={newEvent[field]}
                        onChange={handleEventInputChange}
                        className="w-full bg-purple-700 border border-purple-600 rounded px-2 py-1 text-sm text-white"
                        required
                      />
                    )}
                  </div>
                ))}
                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="flex-1 border border-purple-500 hover:bg-purple-700 text-white py-1 px-2 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Upcoming Events */}
          <div>
            <h3 className="font-bold mb-3 text-purple-200">📋 Upcoming Events</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {events
                .filter(event => dayjs(event.date).isAfter(dayjs().subtract(1, 'day')))
                .sort((a, b) => dayjs(`${a.date} ${a.time}`).diff(dayjs(`${b.date} ${b.time}`)))
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="bg-purple-700 p-2 rounded text-sm">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-80">
                      {dayjs(event.date).format('MMM D')} at {event.time}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
