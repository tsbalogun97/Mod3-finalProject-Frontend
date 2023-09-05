import { useState } from 'react'


const Signup = () => {
  //using useState to keep track of what is being typed inside the signup fields for the email & password
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  return (
    <form className="signup" onSubmit={}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input 
      
      type="email" 
      onChange={(e) => setEmail(e.target.value)}
      //when the value changes whether typing into the field or delete a letter, you want it to update the email state to match it 
      />

    </form>

  )

}