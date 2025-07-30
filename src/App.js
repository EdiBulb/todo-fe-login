import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api"

function App() {
  // PrivateRoute에 사용할 user를 만듬
  const [user, setUser]=useState(null)

  // 토큰을 통해 유저정보를 가져오는 함수(백엔드 소통)
  const getUser =async()=>{
    try{
      //토큰 가져오기
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        // 저장된 토큰이 있다는 말은 로그인을 했었다.
        const response = await api.get("/user/me")
        console.log("rrrrr", response);
        setUser(response.data.user)
      }
    }catch(error){
      setUser(null)

    }
  }

  useEffect(()=>{
    getUser()
  }, [])
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} /> 
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
