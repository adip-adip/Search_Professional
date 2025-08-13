import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<HomePage/>}/>
      {/* Add more routes as needed */}
    </Routes>
  )
}

export default App
