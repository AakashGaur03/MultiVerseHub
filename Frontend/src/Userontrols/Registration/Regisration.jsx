// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import axios from "axios";



// const Regisration = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullName: "",
//     password: "",
//     email: "",
//     avatar: null,
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];

//     setFormData({
//       ...formData,
//       avatar: file,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // axios({
//     //   method: 'post',
//     //   url: '/api/v1/users/register',
//     //   data: formData
//     // });

//     axios.post('http://localhost:8000/api/v1/users/register', formData)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Form.Label htmlFor="userName">username</Form.Label>
//         <Form.Control
//           type="text"
//           onChange={handleChange}
//           value={formData.username}
//           id="username"
//         />

//         <Form.Label htmlFor="fullName">Full name</Form.Label>
//         <Form.Control
//           type="text"
//           onChange={handleChange}
//           value={formData.fullName}
//           id="fullName"
//         />

//         <Form.Label htmlFor="password">Password</Form.Label>
//         <Form.Control
//           type="password"
//           onChange={handleChange}
//           value={formData.password}
//           id="password"
//           aria-describedby="passwordHelp"
//         />

//         <Form.Label htmlFor="email">email</Form.Label>
//         <Form.Control
//           type="email"
//           onChange={handleChange}
//           value={formData.email}
//           id="email"
//           aria-describedby="emailHelpBlock"
//         />
//         <Form.Label htmlFor="inputavatar5">avatar</Form.Label>
//         <Form.Control
//           type="file"
//           id="inputavatar5"
//           aria-describedby="avatarHelpBlock"
//           onChange={handleFile}
//         />

//         <button type="submit">Submit</button>
//       </Form>
//     </>
//   );
// };

// export default Regisration;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationStart, registerUser } from '../../Features/auth/authSlice'; // Import registerUser function

const Registration = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    email: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Dispatch registrationStart action with formData
      await dispatch(registerUser(formData));
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username"  />
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name"  />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"  />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"  />
        <input type="file" name="avatar" onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })} />
        <button type="submit" disabled={loading}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
