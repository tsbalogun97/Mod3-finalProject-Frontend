import { useAuthContext } from "./useAuthContext"
import { useCarsContext } from "./useCarsContext"


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: CarsDispatch } = useCarsContext()

  const logout = () => {
    // removing user from local storage
    localStorage.removeItem('user')


    // dispatch logout action 
    dispatch({type: 'LOGOUT'})
    CarsDispatch ({type: 'SET_CARS', payload: null})
  }

  return {logout}
}



