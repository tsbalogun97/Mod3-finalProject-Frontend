import { useEffect } from "react";
import { useCarsContext } from "../hooks/useCarsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import CarDetails from "../components/CarDetails";
import CarForm from "../components/CarForm";

const Home = () => {
  // const [cars, setCars] = useState(null)
  const { cars, dispatch } = useCarsContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("/api/cars", {
        headers: {
          'Authorization': `Bearer ${user.token}`//this is a way to send this authorization headers with the user token which can be grabbed in the backend inside the middleware function that protects the api routes. If valid, it will give access to the './api/cars' endpoint
        }
      });
      const json = await response.json(); //passing json with object cars

      if (response.ok) {
        // if the response is ok, then i will be  an updating the cars with setCars and
        //the value of it will be array of data
        // setCars(json) an array of cars
        dispatch({ type: "SET_CARS", payload: json });
      }
    };

    if (user) {
      fetchCars();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {/* <h2>Home</h2> */}
      <div className="cars">
        {cars &&
          cars.map(
            (
              car //this means if we have a value of cars then we will map through them
            ) => (
              // if this is null, which is the initial start, then it will not run through the map.*only works
              // when the json is updated
              // <p key={car._id}>{car.title}</p>
              <CarDetails key={car._id} car={car} />
            )
          )}
      </div>
      <CarForm />
    </div>
  );
};

export default Home;
