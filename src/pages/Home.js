import { useEffect } from "react"
import { useCarsContext } from "../hooks/useCarsContext"

//components
import CarDetails from '../components/CarDetails'
import CarForm from '../components/CarForm'

const Home = () => {
  // const [cars, setCars] = useState(null)
  const {cars, dispatch} = useCarsContext()

  useEffect(()=> {
    const fetchCars = async () => {
      const response = await fetch('/api/cars')
      const json = await response.json()//passing json with object cars

      if(response.ok){// if the response is ok, then i will be  an updating the cars with setCars and
        //the value of it will be array of data
        // setCars(json) an array of cars
        dispatch({type: 'SET_CARS', payload: json})

      }
    }
    fetchCars()
  }, [])

  return(
    <div className="home">
      {/* <h2>Home</h2> */}
      <div className="cars">
        {cars && cars.map((car) =>(//this means if we have a value of cars then we will map through them
        // if this is null, which is the initial start, then it will not run through the map.*only works
        // when the json is updated
          // <p key={car._id}>{car.title}</p>
          <CarDetails key={car._id} car={car}/>
        
        ))}
      </div>
      <CarForm />
    </div>
  )
}

export default Home 