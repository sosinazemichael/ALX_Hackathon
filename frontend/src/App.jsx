import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Workspace from './pages/Workspace'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
