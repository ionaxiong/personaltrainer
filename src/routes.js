import React from 'react';
import DashboardLayout from './components/DashboardLayout';
import Customers from './pages/Customers';
import Trainings from "./pages/Trainings";
import Home from './pages/Home';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/customers', element: <Customers />},
      { path: '/trainings', element: <Trainings /> },
      // { path: '/calendar', element: <Calendar /> },
      // { path: '/statistics', element: <Statistics /> },
    ]
  }
];

export default routes;
