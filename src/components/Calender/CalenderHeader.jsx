import dayjs from 'dayjs';

export const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-4">
      <button 
        onClick={onPrevMonth}
        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md transition duration-200 shadow-sm"
        aria-label="Previous month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <h2 className="text-2xl font-bold text-purple-800 tracking-wide">
        {currentDate.format('MMMM YYYY')}
      </h2>
      
      <button 
        onClick={onNextMonth}
        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md transition duration-200 shadow-sm"
        aria-label="Next month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
