import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './Components/Header'
import Dropdown from './Components/Dropdown'
import PrivateRoute from './Components/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/about' element={<About/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile />}/>
      </Route>
      

    </Routes>
    {/* <Dropdown/> */}
    </BrowserRouter>
    
  )
}

export default App
