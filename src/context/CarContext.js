import { createContext, useReducer } from "react";

export const CarsContext =createContext() //creates a brand new context

export const carsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARS':  //setting all of the cars and you want the new case to return a new value that you want the state to be. essentially, returning a new object.
      return {
        cars: action.payload
      }
    case 'CREATE_CAR':
      return {
        cars: [action.payload, ...state.cars] // will add a new car object in array along with previous state of the cars property. *this is just to keep the local state in sync with the DB
      }
    case 'DELETE_CAR':
      return {
        cars: state.cars.filter((car) => car._id !== action.payload._id)
      }
    /////************************************************** */
    case "UPDATE_CAR":
      return {
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
      };
      
    default: //this is needed if none of them match and in that case, you just return the state unchanged
      return state
  }
}

export const CarsContextProvider = ({ children }) =>{ // this will provide context to the application component tree so that each components can access it
  const [state, dispatch] = useReducer(carsReducer, {//two aguments used initial state(carsproperty) and reducer function name(carsReducer)
    cars: null

  })
  
  // dispatch({type: 'SET_CARS', payload: [{}, {}]}) passes an object as agument with type property which is a capitalized string which describes in words the state change you want it to make
  // payload is any data that you need to make the change.

  return ( //template for the carsContext which will wrap around the whole components(route at the top of it)
    <CarsContext.Provider value={{...state, dispatch}}>
      {/* ...state means I'm using spread operator to spread out properties iniside the cars object  */}
{/* the value prop is equal to an array object whcih will be added to components */}
      { children }
    </CarsContext.Provider>
  )

}

