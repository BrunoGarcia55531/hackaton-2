import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ExpensesProvider } from './contexts/ExpensesContext'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import ExpensesSummary from './components/ExpensesSummary'
import ExpensesDetail from './components/ExpensesDetail'
import ExpenseForm from './components/ExpenseForm'
import Goals from './components/Goals'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ExpensesSummary />
                  <ExpenseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category/:categoryId"
              element={
                <ProtectedRoute>
                  <ExpensesDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ExpensesProvider>
    </AuthProvider>
  )
}

export default App
