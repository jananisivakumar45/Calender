import { Event } from './CalendarDay';

export const EventList = ({ events, overlapStatus }) => {
  if (events.length === 0) {
    return (
      <div className="text-purple-400 italic text-[11px] mt-1 text-center">
        No events
      </div>
    );
  }

  return (
    <div className="mt-1 space-y-1">
      {events.map((event, idx) => (
        <Event
          key={event.id}
          event={event}
          isOverlapping={overlapStatus[idx]}
          isCompact={true}
        />
      ))}
    </div>
  );
};
