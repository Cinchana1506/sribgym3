import React from 'react';

const days = [
  { day: 'Monday', activity: 'Yoga', color: '#e3f2fd' },
  { day: 'Tuesday', activity: 'Aerobics', color: '#e8f5e9' },
  { day: 'Wednesday', activity: 'Yoga', color: '#e3f2fd' },
  { day: 'Thursday', activity: 'Aerobics', color: '#fffde7' },
  { day: 'Friday', activity: 'Zumba', color: '#fce4ec' },
];

const ActivitySchedule = ({ activity }) => {
  if (activity !== 'Group Exercise') return null;
  return (
    <section style={{ background: '#fff', padding: 20, margin: '20px 0', borderRadius: 8, boxShadow: '0 1px 4px #eee' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Activity Details</div>
      <div style={{ display: 'flex', gap: 16 }}>
        {days.map(({ day, activity, color }) => (
          <div key={day} style={{ background: color, padding: 12, borderRadius: 6, minWidth: 100, textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>{day}</div>
            <div>{activity}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySchedule; 