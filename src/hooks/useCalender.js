import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getMonthDays } from '../utils/dateUtils';
import { groupEventsByDate, checkEventOverlap } from '../utils/eventUtils';

export const useCalendar = (initialDate, events) => {
  const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
  const [days, setDays] = useState([]);
  const [eventsByDate, setEventsByDate] = useState({});
  
  useEffect(() => {
    const daysArray = getMonthDays(currentDate);
    setDays(daysArray);
  }, [currentDate]);
  
  useEffect(() => {
    const groupedEvents = groupEventsByDate(events);
    setEventsByDate(groupedEvents);
  }, [events]);
  
  const navigateMonth = (direction) => {
    setCurrentDate(currentDate.add(direction, 'month'));
  };
  
  const getEventsForDate = (date) => {
    const dateKey = dayjs(date).format('YYYY-MM-DD');
    return eventsByDate[dateKey] || [];
  };
  
  const getOverlapStatus = (events) => {
    return checkEventOverlap(events);
  };
  
  return {
    currentDate,
    days,
    navigateMonth,
    getEventsForDate,
    getOverlapStatus,
    setCurrentDate
  };
};