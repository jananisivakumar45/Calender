import { useState } from 'react';
import dayjs from 'dayjs';
import { useCalendar } from '../../hooks/useCalender';
import { CalendarHeader } from './CalenderHeader';
import { CalendarGrid } from './CalenderGrid';
import { Sidebar } from './Sidebar';
import { AddEventModal } from './AddEventModel';

const Calendar = ({ events: initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);

  const {
    currentDate,
    days,
    navigateMonth,
    getEventsForDate,
    getOverlapStatus,
    setCurrentDate
  } = useCalendar(new Date(), events);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <div className="flex w-screen h-screen bg-gradient-to-br from-purple-100 to-purple-50 text-purple-900">
      <Sidebar 
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onAddEvent={() => setShowModal(true)}
        events={events}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <CalendarHeader 
            currentDate={currentDate}
            onPrevMonth={() => navigateMonth(-1)}
            onNextMonth={() => navigateMonth(1)}
          />

          <CalendarGrid 
            days={days}
            getEventsForDate={getEventsForDate}
            getOverlapStatus={getOverlapStatus}
          />

          {/* Legend */}
          <div className="mt-6 p-4 bg-purple-200/30 border border-purple-300 rounded-lg shadow-sm">
            <h3 className="text-purple-800 font-semibold mb-3 text-sm">Legend</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                <span>Event</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Overlapping Event</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddEventModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={handleAddEvent} 
        existingEvents={events} 
      />
    </div>
  );
};

export default Calendar;