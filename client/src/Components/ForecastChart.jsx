// ForecastChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default ForecastChart;
