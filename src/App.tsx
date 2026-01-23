import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OverallPerformance } from '@/pages/OverallPerformance'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/performance" replace />} />
        <Route path="/performance" element={<OverallPerformance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
