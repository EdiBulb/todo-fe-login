import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // 회원이 입력한 값 가져오기
  const [name, setName]=useState('')
  const [email,setEmail]=useState('')
  const[password, setPassword]=useState('')
  const[secPassword, setSecPassword]=useState('')

  const [error, setError] = useState("")

  // navigate 생성
  const navigate = useNavigate()

  // 회원가입 버튼 클릭시, 입력 값들을 BE로 보내야함
  const handleSubmit= async (event)=>{
    event.preventDefault() // 페이지를 reload 안해주기 위해서
    try{
        // password와 secPassword가 같은지 확인
      if(password !==secPassword){
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력")
      }
      //일치한다면, api 호출하기
      console.log("sending to server: ", { name, email, password, headers: api.defaults.headers});

      const response = await api.post('/user',{name, email, password}) // 회원가입이라서 post
      console.log("테스트")
      // 회원가입 성공 시, 로그인 페이지로 넘어가기
      if(response.status == 200){
        //navigate로 옮겨준다.
        navigate('/login') // 로그인 페이지로 이동
      }else{
        // 에러시, 에러 던져주기
        throw new Error(response.data.error)
      }
    } catch (error) {
  console.error("❌ Catch Error:", error);

  const message =
    error.response?.data?.error?.message ||
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message;

  setError(message || "Something went wrong.");

}
    
  }
  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event)=>setSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
