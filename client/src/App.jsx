import './App.css'
import Home from './pages/home'
import FileUpload from './pages/fileUpload'
import { Routes, Route } from 'react-router-dom'
import AllFiles from './pages/allFiles'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<FileUpload />} />
        <Route path="/allfiles" element={<AllFiles />} />
      </Routes>
    </>
  )
}

export default App