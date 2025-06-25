import { useState } from 'react';
import dayjs from 'dayjs';

export const AddEventModal = ({ isOpen, onClose, onAdd, existingEvents }) => {
  const [form, setForm] = useState({
    title: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '09:00',
    duration: 60,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...form,
      id: Math.max(0, ...existingEvents.map(e => e.id)) + 1,
    };
    onAdd(newEvent);
    onClose();
    setForm({ title: '', date: dayjs().format('YYYY-MM-DD'), time: '09:00', duration: 60, description: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-purple-800 mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="title" value={form.title} onChange={handleChange}
            placeholder="Event title"
            className="w-full border border-purple-300 rounded px-3 py-2 text-sm" required />

          <input type="date" name="date" value={form.date} onChange={handleChange}
            className="w-full border border-purple-300 rounded px-3 py-2 text-sm" required />

          <input type="time" name="time" value={form.time} onChange={handleChange}
            className="w-full border border-purple-300 rounded px-3 py-2 text-sm" required />

          <input type="number" name="duration" value={form.duration} onChange={handleChange}
            placeholder="Duration in minutes"
            className="w-full border border-purple-300 rounded px-3 py-2 text-sm" min="1" required />

          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Description"
            className="w-full border border-purple-300 rounded px-3 py-2 text-sm" rows="2" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-black">
              Cancel
            </button>
            <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded text-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
