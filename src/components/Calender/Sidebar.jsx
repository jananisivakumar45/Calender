import { useState } from 'react';

export const Sidebar = ({
  currentDate,
  onDateChange,
  onAddEvent,
  events
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const months = Array.from({ length: 12 }, (_, i) =>
    currentDate.month(i).format('MMMM')
  );

  const years = Array.from({ length: 10 }, (_, i) =>
    currentDate.year() - 5 + i
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newDate = name === 'month'
      ? currentDate.month(months.indexOf(value))
      : currentDate.year(value);
    onDateChange(newDate);
  };

  return (
    <div
      className={`transition-all duration-300 h-full text-white 
      ${isExpanded ? 'w-64' : 'w-16'} bg-gradient-to-b from-purple-800 to-purple-900 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:bg-purple-700 flex items-center justify-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isExpanded ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
        {isExpanded && <span className="ml-2 text-sm">Collapse</span>}
      </button>

      {/* Date Controls */}
      {isExpanded && (
        <>
          <div className="p-4 border-t border-purple-700 space-y-3">
            <div>
              <label className="block text-xs mb-1 text-purple-200">Month</label>
              <select
                name="month"
                value={currentDate.format('MMMM')}
                onChange={handleChange}
                className="w-full bg-purple-700 border border-purple-500 rounded p-1 text-sm"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 text-purple-200">Year</label>
              <select
                name="year"
                value={currentDate.year()}
                onChange={handleChange}
                className="w-full bg-purple-700 border border-purple-500 rounded p-1 text-sm"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-purple-700 space-y-2">
            <h3 className="font-semibold text-sm mb-1 text-purple-100">Quick Actions</h3>
            <button
              onClick={() => onDateChange(dayjs())}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded text-sm"
            >
              Go to Today
            </button>
            <button
              onClick={onAddEvent}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded text-sm"
            >
              Add Event
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="p-4 overflow-y-auto flex-1">
            <h3 className="text-sm font-semibold text-purple-100 mb-2">Upcoming</h3>
            <div className="space-y-2">
              {events
                .filter(e => dayjs(e.date).isAfter(dayjs().subtract(1, 'day')))
                .sort((a, b) => dayjs(`${a.date} ${a.time}`).diff(dayjs(`${b.date} ${b.time}`)))
                .slice(0, 5)
                .map(e => (
                  <div key={e.id} className="bg-purple-700/80 p-2 rounded text-sm">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs opacity-80">
                      {dayjs(e.date).format('MMM D')} at {e.time}
                    </div>
                  </div>
                ))}
              {events.length === 0 && (
                <div className="text-xs text-purple-300 italic">No upcoming events</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
