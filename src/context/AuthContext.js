import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

//creating authReducer function
export const authReducer = (state, action) => {
  //inside here, you want to handle different cases such as login and logout cases
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }// the user will be whatever payload is on the action. this will be user you get back from the server 

    case 'LOGOUT':
      return { user: null }// when you logout, it goes back to null
    default: 
      return state//you are return the origin state if there' no changes
  }
}

//creates custom component that will wrap the entire app and provide a value from this context
export const  AuthContextProvider = ({ children }) => {
  //iniside here is where you register a state using the useReducer hook
  const [state, dispatch] = useReducer(authReducer, {
    user: null 
  })

  useEffect(() =>{//this means only fire this useEffect function once when the component first renders as the react app loads. this function is implemented just to check for the token in the localstorage just once in order to find out if there's a value for it
    const user = JSON.parse(localStorage.getItem('user'))
    //a way to parse that into an object you can use in javascript since JSON is a string in the localStorage

    if (user) {
      dispatch({ type: 'LOGIN', payload: user})
    }
  }, [])


  console.log('AuthContext state: ', state)//this is how you keep track of things as a developer

  return (
    //wraps up the root app (children)
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
  
}