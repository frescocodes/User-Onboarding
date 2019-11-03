import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => { // props are passed down as "values" with mapPropsToValues. you could use props.values and get the same result.
    const [ users, setUser ] = useState([]);
    useEffect(() => {
        if(status) {
            setUser([...users, status])
        }
    }, [status]);

    console.log("values", values)
    return (
        <Form>
            <label>
                <Field 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={values.name} />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={values.email} />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={values.password} />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <Field
                type="text"
                name="role"
                placeholder="Role"
                value={values.role} />
                <Field 
                type="checkbox" 
                name="terms" 
                checked={values.terms} />
                <button>Submit</button>
               {users.map( user => {
                   return (
                       <div>
                           <h1>Name: {user.name}</h1>
                           <h2>Role: {user.role}</h2>
                           <h2>Email: {user.email}</h2>
                        </div>
                   )
               })}
            </label>
        </Form>
    )
}

// returning a component captured in a variable. (var is FormikUserForm, component it's returning is UserForm)
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms, role}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
            role: role || ""
        };
    },
    validationSchema: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().min(8, 'Too short').required(),
        terms: yup.boolean().required()
    }),
    handleSubmit( values, {setStatus}) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(response => {
            console.log(response)
            setStatus(response.data);
        })
        .catch(error => {
            console.log('broken =>', error)
        })
    }
    }

)(UserForm)
console.log("This is the HoC ", FormikUserForm)

export default FormikUserForm