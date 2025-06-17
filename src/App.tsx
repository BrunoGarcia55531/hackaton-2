import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ExpenseDetailPage } from './pages/ExpenseDetailPage'
import { GoalsPage } from './pages/GoalsPage'
import { Dashboard } from './pages/Dashboard'
import { AuthGuard } from './components/AuthGuard'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <Layout>            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/expenses/detail"
              element={
                <AuthGuard>
                  <ExpenseDetailPage />
                </AuthGuard>
              }
            />
            <Route
              path="/goals"
              element={
                <AuthGuard>
                  <GoalsPage />
                </AuthGuard>
              }
            /></Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
