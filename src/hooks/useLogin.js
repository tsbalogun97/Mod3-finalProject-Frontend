import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://carlistings-backend.onrender.com/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const json = await response.json()
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
  return { login, isLoading, error}
}
