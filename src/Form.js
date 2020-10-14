import React from 'react'


export default function userForm(props) {

const { values, update, submit } = props

const onChange = evt => {

    const { name, value } = evt.target;
    update(name, value);

}

const onSubmit = evt => {

evt.preventDefault();

submit();

}

return (
    <form className="form container" onSubmit={onSubmit}>
        <div className="form-group inputs">
            <label>Name
                <input  
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    placeholder="name"
                />
            </label>
            <label>Email
                <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={values.email}
                    placeholder="email"
                />
            </label>
            <label>Password
                <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    placeholder="password"
                /> 
            </label>
            <label>Terms of Service
                <input
                    type="checkbox"
                    name="terms"
                    onChange={onChange}
                    placeholder="false"
                />
            </label>
            <div className="submit">
                <button>submit</button>
            </div>
        </div>
    </form>
    )
}









