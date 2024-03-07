import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doRegister = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password, confirmPassword);
  
    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
    
  // Email validation criteria
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.trim()) {
    console.log("FIRST NAME IS REQUIRED");
  } else if (!lastName.trim()) {
    console.log("LAST NAME IS REQUIRED");
  } else if (!emailRegex.test(email)) {
    console.log("INVALID EMAIL");
  } else if (password !== confirmPassword) {
    console.log("PASSWORDS DON'T MATCH");
  } else if (!passwordRegex.test(password)) {
    console.log("PASSWORD DOESN'T MEET CRITERIA");
  } else {
    console.log("ALL FIELDS ARE CORRECT!");
    // Proceed with registration
  }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doRegister}>
        <span id="inner-title">PLEASE SIGN UP</span>
        <br />
        <input
          type="text"
          id="idFirstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <input
          type="text"
          id="idLastName"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <input
          type="text"
          id="idEmail"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="idPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="idConfirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input type="submit" id="loginButton" className="buttons" value="Do It" />
      </form>
    </div>
  );
};

export default Signup;
