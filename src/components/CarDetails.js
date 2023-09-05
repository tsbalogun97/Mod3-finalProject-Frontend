import { useCarsContext } from "../hooks/useCarsContext"

const CarDetails = ({ car }) => {
  const { dispatch } = useCarsContext()

  const handleClick = async () => {
    const response = await fetch('/api/cars/' +car._id, {
      method: 'DELETE'
    })
    const json = await response.json() 

    if(response.ok) {
      dispatch({type: 'DELETE_CAR', payload: json})
    }
  }
  
  return (
    <div className="car-details">
      <h4>{car.title}</h4>
      <p><strong>Make: </strong>{car.make}</p>
      <p><strong>Model: </strong>{car.model}</p>
      <p><strong>Year: </strong>{car.year}</p>
      <p><strong>Image: </strong><img src={car.image} className="carImg" alt=""/></p>
      <p><strong>Mileage: </strong>{car.mileage}</p>
      {/* <p>{car.createdAt}</p> */}
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

    </div>
  )
}

export default CarDetails
