import React from 'react'
import { createBrowserRouter } from 'react-router'
import Protected from './components/Protected'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Login from './pages/Login'
import Register from './pages/Register'
import ReportsHistory from './pages/ReportsHistory'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: 'interview/:interviewId',
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
      {
        path: 'history',
        element: (
          <Protected>
            <ReportsHistory />
          </Protected>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])