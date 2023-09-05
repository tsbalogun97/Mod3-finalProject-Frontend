import { useState } from 'react'


const Login = () => {
  //using useState to keep track of what is being typed inside the login fields for the email & password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    //inside here you are taking the event object from the submit event. *when submitting a form, the default behavior is to refresh the page
    e.preventDefault()
    console.log(email, password);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input 
      type="email" 
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      //when the value changes whether typing into the field or delete a letter, you want it to update the email state to match it 
      />
      <label>Password:</label>
      <input 
      type="password" 
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      />
      
      <button>Login</button>
    </form>
    )
  
  }

  export default Login