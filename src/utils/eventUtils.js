import dayjs from 'dayjs';

export const groupEventsByDate = (events) => {
  return events.reduce((acc, event) => {
    const dateKey = dayjs(event.date).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});
};

export const checkEventOverlap = (events) => {
  if (events.length <= 1) return Array(events.length).fill(false);
  
  const sortedEvents = [...events].sort((a, b) => 
    dayjs(`${a.date} ${a.time}`).diff(dayjs(`${b.date} ${b.time}`))
  );
  
  const overlapStatus = Array(events.length).fill(false);
  
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEnd = dayjs(`${sortedEvents[i].date} ${sortedEvents[i].time}`)
      .add(sortedEvents[i].duration, 'minute');
    
    const nextStart = dayjs(`${sortedEvents[i+1].date} ${sortedEvents[i+1].time}`);
    
    if (currentEnd.isAfter(nextStart)) {
      overlapStatus[i] = true;
      overlapStatus[i+1] = true;
    }
  }
  
  // Map back to original order
  return events.map((event) => {
    const sortedIdx = sortedEvents.findIndex(e => e.id === event.id);
    return overlapStatus[sortedIdx];
  });
};