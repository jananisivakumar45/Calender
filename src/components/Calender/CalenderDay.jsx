import dayjs from 'dayjs';

export const Event = ({ event, isOverlapping, isCompact = false }) => {
  const eventColors = [
    'bg-purple-100 border-l-4 border-purple-300',
    'bg-purple-200 border-l-4 border-purple-400',
    'bg-purple-300 border-l-4 border-purple-500',
    'bg-purple-50 border-l-4 border-purple-200',
  ];

  const colorClass = eventColors[event.id % eventColors.length];

  return (
    <div 
      className={`${colorClass} p-1 rounded-md text-xs truncate 
        ${isOverlapping ? 'w-1/2' : 'w-full'} 
        ${isCompact ? 'text-xs' : 'text-sm'} shadow-sm transition-colors`}
      title={`${event.title} | ${event.time} (${event.duration} mins): ${event.description}`}
    >
      <div className="font-semibold">{event.time} - {event.title}</div>
      {!isCompact && (
        <div className="text-xs opacity-80 truncate">{event.description}</div>
      )}
    </div>
  );
};

export const CalendarDay = ({ 
  date, 
  isCurrentMonth, 
  isToday, 
  events = [], 
  overlapStatus = [] 
}) => {
  return (
    <div 
      className={`min-h-24 p-2 border border-purple-100 rounded-md transition-all duration-200
        ${isCurrentMonth ? 'bg-white' : 'bg-purple-50 opacity-80'}
        ${isToday ? 'ring-2 ring-purple-500 bg-purple-100' : ''}
        flex flex-col hover:shadow-sm`}
    >
      <div className={`text-sm font-semibold mb-1 
        ${isToday ? 'text-purple-700' : isCurrentMonth ? 'text-purple-900' : 'text-purple-400'}`}
      >
        {date.date()}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1">
        {events.length > 0 ? (
          events.map((event, idx) => (
            <Event 
              key={event.id} 
              event={event} 
              isOverlapping={overlapStatus[idx]} 
            />
          ))
        ) : (
          <div className="text-purple-300 text-xs mt-1 italic">No events</div>
        )}
      </div>
    </div>
  );
};
