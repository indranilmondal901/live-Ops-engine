import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import '../register/Register.css';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();
    // const formData = new FormData();
    // formData.append("first_name",firstName);
    // formData.append("last_name",lastName);
    // formData.append("email",email);
    // formData.append("age",age);
    // formData.append("phone",phone);
    // formData.append("password",password);
    // formData.append("confirm_password",confirmPassword)
    // console.log(formData);
    // console.log("fromdata here==>" +formData);
    // const data = await fetch("http://localhost:8080/register", {
    //   method: "POST",
    //   body: JSON.stringify(formData)
    // })
    // console.log(data); //???????????????????????????????????


    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      age: age,
      password: password,
      confirm_password: confirmPassword,
    };
    await axios.post("http://localhost:8080/register", formData)
    .then((res) => {
      console.log(res);
      window.alert("Your Registration is Sucessfull");
      navigate("/login");
    })


    // const data = await fetch("http://localhost:8080/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
    //     phone: phone,
    //     age: age,
    //     password: password,
    //     confirm_password: confirmPassword,
    //   })
    // })
    // console.log(data)

  }

  return (
    <>
      <Navbar />
      <div></div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Registration Form</legend>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          {/* <Link to={"/login"}> */}
          <button type="submit" >Register</button>
          {/* </Link> */}
        </fieldset>
      </form>
    </>
  )
}


export default Register;
