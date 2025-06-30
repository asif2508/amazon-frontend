import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token){
      axios.get('http://localhost:5000/api/users/auto-login',{
        headers: {
          Authorization: `${token}`
        }
      }).then(res=>{
        if(res?.data?.success){
          setUser(res?.data?.data)
        }
      }).catch(err=>{
        localStorage.removeItem('token')
      })
    }
  },[token])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
