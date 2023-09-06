import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  //using useState to keep track of what is being typed inside the signup fields for the email & password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    //inside here you are taking the event object from the submit event. *when submitting a form, the default behavior is to refresh the page
    e.preventDefault()

    await signup(email, password)
    // console.log(email, password)
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

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

      <button disabled={isLoading}>Sign up</button>
      {/* I added disable value if isloading is true because since its true and the request is going, i dont want to send another one right away */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup
