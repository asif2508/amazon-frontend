import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/commons/Header'
import HomePage from './components/Home/HomePage'
import Login from './components/Login/Login'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
