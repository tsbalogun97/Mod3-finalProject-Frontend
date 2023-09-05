import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1> Classic Car Rentals</h1>
        </Link>
        <nav>
          <div>
            <link to="/login">Login</link>
            <link to="/signup">Signup</link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar