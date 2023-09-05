import { useState } from "react"
import { useCarsContext } from "../hooks/useCarsContext"

const CarForm = () => {// state created for each properties of the new CarForm
  const { dispatch } = useCarsContext()

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [image, setImage] = useState('')
  const [mileage, setMileage] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()//prevents refresh 

    const car = {make, model, year, image, mileage}

    const response = await fetch('/api/cars', {// use the fetch api to send the post request
      method: 'POST', 
      body: JSON.stringify(car),//this changes car object into a JSON
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json() 
    
    if (!response.ok) {
      setError(json.error)//if the response is not ok, i want to get an error property
      setEmptyFields(json.emptyFields)

    }

    if (response.ok) {
      setMake('')
      setModel('')
      setYear('')
      setImage('')
      setMileage('')
      setError(null)
      setEmptyFields([])
      console.log('new car added', json);
      dispatch({tyepe: 'CREATE_CAR', payload: json})
    }
  }


  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Car</h3>

      <label>Vehicle Make:</label>
      <input 
      type="text" 
      onChange={(e) => setMake(e.target.value)} //basically the user call the setMake function, 
      value={make}
      className={emptyFields.includes('make') ? 'error' : ''}
      />
      
      <label>Vehicle Model:</label>
      <input 
      type="text" 
      onChange={(e) => setModel(e.target.value)} 
      value={model}
      className={emptyFields.includes('model') ? 'error' : ''}
      />
      
      <label>Vehicle Year:</label>
      <input 
      type="number" 
      onChange={(e) => setYear(e.target.value)} 
      value={year}
      className={emptyFields.includes('year') ? 'error' : ''}
      />
      
      <label>Vehicle Image:</label>
      <input 
      type="string" 
      onChange={(e) => setImage(e.target.value)} 
      value={image}
      className={emptyFields.includes('image') ? 'error' : ''}
      />
      
      <label>Mileage:</label>
      <input 
      type="String" 
      onChange={(e) => setMileage(e.target.value)}  
      value={mileage}
      className={emptyFields.includes('mileage') ? 'error' : ''}
      />
      <button>Add Car</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CarForm