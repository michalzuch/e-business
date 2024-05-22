import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
