import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpForm from '../Pages/SignUpForm'
import LoginForm from '../Pages/LoginForm'
import Todo from '../Pages/Todo'
import AuthRouter from './AuthRouter'

const AppRouter = () => {
  return <BrowserRouter>
    <Routes>
        <Route path='/' element={<AuthRouter element={<Todo />}/>}></Route>
        <Route path='/signup' element={<SignUpForm />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
    </Routes>
  </BrowserRouter>
}

export default AppRouter