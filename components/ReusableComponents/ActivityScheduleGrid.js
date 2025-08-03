import React from 'react';

const ActivityScheduleGrid = ({ 
  activities = [
    { day: 'Monday', activity: 'Yoga', color: '#e3f2fd' },
    { day: 'Tuesday', activity: 'Aerobics', color: '#f3e5f5' },
    { day: 'Wednesday', activity: 'Yoga', color: '#e8f5e9' },
    { day: 'Thursday', activity: 'Aerobics', color: '#fffde7' },
    { day: 'Friday', activity: 'Zumba', color: '#fce4ec' }
  ],
  style = {}
}) => {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginRight: 80, ...style }}>
      {activities.map(({ day, activity, color }) => (
        <div key={day} style={{ 
          background: color, 
          padding: 12, 
          borderRadius: 6, 
          minWidth: 60, 
          textAlign: 'left',
          flex: 1,
          marginRight: 4
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#202224', marginBottom: 6 }}>{day}</div>
          <div style={{ fontSize: 14, color: '#202224' }}>{activity}</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityScheduleGrid; 