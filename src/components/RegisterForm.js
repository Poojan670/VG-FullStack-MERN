const RegisterForm = ({ type, name, values, onChange, labelText }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <input type={type}
                className='form-input'
                value={values.userName}
                name={name}
                onChange={onChange} />
        </div>
    )
}

export default RegisterForm
