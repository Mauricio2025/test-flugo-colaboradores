import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegistrationProvider } from './contexts/RegistrationContext'
import Layout from './components/Layout'
import Collaborators from './pages/Collaborators'
import RegisterCollaborator from './pages/RegisterCollaborator'

export default function App() {
  return (
    <BrowserRouter>
      <RegistrationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Collaborators />} />
            <Route path="/register" element={<RegisterCollaborator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </RegistrationProvider>
    </BrowserRouter>
  )
}
