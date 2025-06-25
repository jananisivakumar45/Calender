import dayjs from 'dayjs';

export const getMonthDays = (date = dayjs()) => {
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');
  
  const startDay = monthStart.day();
  const totalDays = monthEnd.date();
  
  const daysArray = [];
  
  // Previous month days
  for (let i = 0; i < startDay; i++) {
    daysArray.push({
      date: monthStart.subtract(startDay - i, 'day'),
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const currentDate = monthStart.date(i);
    daysArray.push({
      date: currentDate,
      isCurrentMonth: true,
      isToday: currentDate.isSame(dayjs(), 'day')
    });
  }
  
  // Next month days
  const remainingDays = 42 - daysArray.length; // 6 weeks
  for (let i = 1; i <= remainingDays; i++) {
    daysArray.push({
      date: monthEnd.add(i, 'day'),
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  return daysArray;
};

export const formatDateKey = (date) => dayjs(date).format('YYYY-MM-DD');