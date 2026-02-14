import './App.css'
import Home from './pages/home'
import FileUpload from './pages/fileUpload'
import { Routes, Route } from 'react-router-dom'
import AllFiles from './pages/allFiles'
import Login from './pages/login'
import Footer from './components/footer'
import SignUp from './pages/signup'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<FileUpload />} />
        <Route path="/allfiles" element={<AllFiles />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

    </>
  )
}

export default App