import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://carlistings-backend.onrender.com/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},// way to send data to the request body property.
      body: JSON.stringify({email, password})
    })
    const json = await response.json()//when you get a response , in order to get a json data, you have to use a response.json method. This either going to return some information with the json web token if it was a success. but if it wasnt, then it will send back an error message

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage that way their jwt is still stored somewhere in the browser even if they log in back and forth.
      localStorage.setItem('user', JSON.stringify(json))//a way to store string such as the jwt and also the email property in the local storage

      //update the auth context
      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }
  return { signup, isLoading, error}
}
