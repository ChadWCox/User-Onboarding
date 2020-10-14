import React, { useEffect, useState } from 'react';
import Form from "./Form";
import * as yup from "yup"
import axios from 'axios';
import User from "./user"

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: "",
}

const userSchema = yup.object().shape({
    
    name: yup.string().required().min(4),
    email: yup.string().email().required().min(6),
    password: yup.string().required().min(8) ,
    terms: yup.boolean().required()
          .test("is-value-true", "Terms must be selected", (val) => {
          return val === true;
      })
  });


export default function App() {

  
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState(initialFormValues);

  const updateForm = (inputName, inputValue) => {

    setFormValues(
      {...formValues, [inputName]: inputValue,}
      );
  };
  
  useEffect(() => {
          axios.get("https://reqres.in/api/users").then((res) => setUsers(res.data.data));
        }, []);

        

  const submitForm = () => {

    let newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    };

          axios
          .post("https://reqres.in/api/users", newUser)
          .then((res) => {
            setUsers([...users, res.data]);
            setFormValues(initialFormValues);
          })
          .catch((error) => {

            console.log(error);
          })
        };

        
  
    return (
    <div className="container">
      <h1>User Database</h1>

      <Form 
        values={formValues}
        validationSchema={userSchema}
        update={updateForm}
        submit={submitForm}
        />
      
      {users.map((user) => {
        return <User key={user.id} details={user}/>
      })}
    </div>
  );
  }

