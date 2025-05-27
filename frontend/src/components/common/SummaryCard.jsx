// src/components/common/SummaryCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material'; // Still use Card for base

const SummaryCard = ({ title, value, icon, color = "text-fittrack-gray-900", isLoading, className }) => {
  return (
    <Card className={`h-full flex flex-col rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardContent className="flex-grow flex flex-col justify-between p-5"> {/* Increased padding */}
        <div className="flex justify-between items-start mb-3">
          <Typography variant="body1" className="font-medium text-fittrack-gray-600">
            {title}
          </Typography>
          {icon && <div className={`${color} text-3xl`}>{icon}</div>}
        </div>
        <div className="mt-auto"> {/* Pushes value to the bottom */}
          {isLoading ? (
            <CircularProgress size={32} />
          ) : (
            <Typography variant="h5" component="div" className={`${color} font-bold text-2xl`}>
              {value}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default SummaryCard;