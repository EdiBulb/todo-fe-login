import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api"

import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  // 입력된 값을 가져오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  // 유저 정보 저장을 위한 state
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const handleLogin=async(event)=>{
    // refresh 방지임
    event.preventDefault()
    try{
      //로그인을 하기 위한 api 호출
      //로그인도 post를 쓴다. 왜냐? req.body를 써야하기 때문임 - password를 url에 넣으면 안되므로
      const response = await api.post('/user/login', {email, password})
      console.log("response: ", response);
      if(response.status === 200){
        console.log("로그인 성공", response.data)
        setUser(response.data.user)
        sessionStorage.setItem("token", response.data.token); // session storage에 토큰값 저장
        // headers에 토근 전달
        api.defaults.headers["authorization"] = "Bearer "+response.data.token
        setError("")
        navigate("/") // 로그인 후 todo page로 이동
      }
      // throw new Error(response.message)
      // throw new Error(response.data.error)

    }catch(error){
      console.error("로그인 실패:", error)
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
