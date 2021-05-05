import React from 'react';
import { Calendar } from 'react-feather';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import CustomerList from 'src/pages/CustomerList';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Customers from './pages/Customers';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <Customers /> },
      { path: 'trainings', element: <Trainings /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'statistics', element: <Statistics /> },
    ]
  }
];

export default routes;
