import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()

  }

  return (
    <header>
      <div className="container">
        <Link to="/">
        <img src='https://www.designrush.com/topbest/images/avatar-designrush.png' className='logo'/>
          <h1 className='carC'> Vintage Car Listings</h1>
          
        </Link>
        <nav>
          
          {user && (//this user template is evoked when we have a value for user, this here if it's not null then output this template where we see the user's email and also this thing right here 
            <div>
              <span>{user.email}</span>
            {/* this logic is implemented to make sure that when user log back in the email credentials populate next to the button */}
              <button onClick={handleClick}>Logout</button>
            </div>
          )}

          {!user && (//the opposite will be implemented where you dont have the user and if thats the case, they should see the login and signup link
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}


export default Navbar