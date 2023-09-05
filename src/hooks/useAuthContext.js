import { CarsContext } from "../context/CarContext";
import { useContext } from "react";// this will be used to consume the context

export const useCarsContext = () => {
  const context = useContext(CarsContext)//this is passed from the value from CarsContext.Provider from the CarsContext.js

  if(!context) {
    throw Error('useCarsContext must be used inside a CarsContextProvider')
  }

  return context // this means that anytime I want to use the data , I just will have to  evoke the useCarsContext hook to get that context value back.
}