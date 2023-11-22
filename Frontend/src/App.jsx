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
import CreateBook from './pages/CreateBook'
import UpdateBook from './pages/UpdateBook'
import Card from './pages/Card/Card'
import UserBook from './pages/UserBook'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/card' element={<Card/>} />
      <Route path='/book/:bookId' element={<UserBook/>} />
      <Route element={<PrivateRoute/>}> {/* this components only render when user is login */}
          <Route path='/profile' element={<Profile />}/>
          <Route path='/createbook' element={<CreateBook/>}/>
          <Route path='/updatebook/:bookId' element={<UpdateBook/>}/>
      </Route>
      

    </Routes>
    {/* <Dropdown/> */}
    </BrowserRouter>
    
  )
}

export default App
