import { CalendarDay } from './CalenderDay';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid = ({ days, getEventsForDate, getOverlapStatus }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day headers */}
      {dayNames.map((day) => (
        <div
          key={day}
          className="text-center font-semibold text-purple-600 bg-purple-50 py-2 rounded-md"
        >
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, idx) => {
        const events = getEventsForDate(day.date);
        const overlapStatus = getOverlapStatus(events);

        return (
          <CalendarDay
            key={idx}
            date={day.date}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isToday}
            events={events}
            overlapStatus={overlapStatus}
          />
        );
      })}
    </div>
  );
};
