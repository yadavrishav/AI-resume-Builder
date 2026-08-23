import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './context/AuthContext'
import { InterviewProvider } from './context/InterviewContext'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
