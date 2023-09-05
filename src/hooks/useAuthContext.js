import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";// this will be used to consume the context

export const useAuthContext = () => {
  const context = useContext(AuthContext)//this is passed from the value from AuthContextProvider from the useAuthContext.js

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context // this means that anytime I want to use the data , I just will have to  evoke the useAuthContext hook to get that context value back.
}