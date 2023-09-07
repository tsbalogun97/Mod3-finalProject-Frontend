import { useCarsContext } from "../hooks/useCarsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

const CarDetails = ({ car }) => {
  const { dispatch } = useCarsContext()
  const { user} = useAuthContext()
  const [editMode, setEditMode] = useState(false);
  const [editedCar, setEditedCar] = useState(car);


  //******************************************************************* */
  const handleEdit = async () => {
    if (!user || !user.token) {
      console.error("User is not authenticated.");
      return;
    }
    setEditMode(true);
    try {
      const response = await fetch("/api/cars/" + car._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include the token in the headers
        },
        body: JSON.stringify(editedCar),
      });
      if (!response.ok) {
        // Handle server errors or non-JSON responses here
        console.error("Update failed with status:", response.status);
        return;
      }
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_CAR", payload: json });
        //setEditMode(false); // Switch back to view mode after successful update
        setEditMode(true);
      }
      console.log(json);
      console.log("User:", user);
    } catch (error) {
      // Handle any network or other errors
      console.error("Update failed:", error);
    }
  };
///********************************************************************************************* */

const handleCancelEdit = () => {
  setEditedCar (false); // Cancel editing and switch back to view mode
  setEditedCar(car); // Reset the edited workout data to the current workout data
};

/////********************************************************************************** */

const handleSubmit = async () => {
  try {
    const response = await fetch("/api/cars/" + car._id, {
      method: "PATCH", // Use PATCH method for updating
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editedCar), // Send the edited workout data
    });
    if (!response.ok) {
      // Handle server errors or non-JSON responses here
      console.error("Update failed with status:", response.status);
      return;
    }
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_CAR", payload: json });
      setEditMode(true); // Switch back to view mode after successful update
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("Update failed:", error);
  }
};
////*************************************************************************** */


const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/cars/' +car._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json() 

    if(response.ok) {
      dispatch({type: 'DELETE_CAR', payload: json})
    }
  }
  
  return (
    <div className="car-details"> 
      {editMode ? (
        <form>
        <label> Make:</label>
        <input
          type="text"
          value={editedCar.make}
          onChange={(e) =>
            setEditedCar({ ...editedCar, make: e.target.value })
          }
        />
        <label> Model:</label>
        <input
          type="text"
          value={editedCar.model}
          onChange={(e) =>
            setEditedCar({ ...editedCar, model: e.target.value })
          }
        />
        <label> Year:</label>
        <input
          type="number"
          value={editedCar.year}
          onChange={(e) =>
            setEditedCar({ ...editedCar, year: e.target.value })
          }
        />
        <label> Image:</label>
        <input
          type="string"
          value={editedCar.image}
          onChange={(e) =>
            setEditedCar({ ...editedCar, image: e.target.value })
          }
        />
        <label> Mileage:</label>
        <input
          type="number"
          value={editedCar.mileage}
          onChange={(e) =>
            setEditedCar({ ...editedCar, mileage: e.target.value })
          }
        />
        {/* Add input fields for load, reps, and other properties */}
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleCancelEdit}>Cancel</button>
      </form>
      
      
      
      
      
      ): (
      <>
      <h4>{car.title}</h4>
      <p><strong>Make: </strong>{car.make}</p>
      <p><strong>Model: </strong>{car.model}</p>
      <p><strong>Year: </strong>{car.year}</p>
      <p><strong>Image: </strong><img src={car.image} className="carImg" alt=""/></p>
      <p><strong>Mileage: </strong>{car.mileage}</p>
      {/* <p>{car.createdAt}</p> */}
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <button onClick={handleEdit}>EDIT</button>
      </>)}
      </div>
  )
};
export default CarDetails






