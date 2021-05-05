import React from 'react';
import DashboardLayout from './components/DashboardLayout';
import Customers from './pages/Customers';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <Customers /> },
      // { path: 'trainings', element: <Trainings /> },
      // { path: 'calendar', element: <Calendar /> },
      // { path: 'statistics', element: <Statistics /> },
    ]
  }
];

export default routes;
