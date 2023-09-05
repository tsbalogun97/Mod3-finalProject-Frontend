import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

//creating authReducer function
export const authReducer = (state, action) => {
  //inside here, you want to handle different cases such as login and logout cases
  switch (action.type) {
    case 'LOGIN':
      return { user: }// the user will be whatever payload is on the outside
  }
}

//creates custom component that will wrap the entire app and provide a value from this context
export const  AuthContextProvider = ({ children }) => {
  //iniside here is where you register a state using the useReducer hook
  const [state, dispatch] = useReducer(authReducer, {
    user: null 
  })
  
}