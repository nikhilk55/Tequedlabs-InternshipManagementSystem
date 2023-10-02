import React from 'react'
import Login from './Signin'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Students from './Students'
import Profile from './Profile'
import Home from './Home'
import AddStudents from './AddStudents'
import StudentEdit from './studentEdit'
import NewAdmin from './NewAdmin'

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='/Students' element={<Students />}></Route>
            <Route path='/Profile' element={<Profile />}></Route>
            <Route path='/Home' element={<Home />}></Route>
            <Route path='/create' element={<AddStudents />}></Route>
            <Route path='/updateProjectStatus/:id' element={<StudentEdit />}></Route>
            <Route path='/StudentEdit/:id' element={<StudentEdit />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/NewAdmin" element={<NewAdmin />} />
        </Routes>
      </BrowserRouter>       
  )
}

export default App
