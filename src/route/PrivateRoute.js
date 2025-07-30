import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

// PrivateRoute는 user값이 있으면 보여주고, 없으면 안보여준다.
// user값 있으면? Todopage : redirect to /login

const PrivateRoute = ({user, children}) => {
  return (
    // PrivateRoute는 공용 페이지로 만들기 위해서 children을 쓴다.
    user? children:<Navigate to='/login'/> // user가 있으면 children으로 가고 없으면 로그인 페이지로 간다. 
  )
}

export default PrivateRoute
