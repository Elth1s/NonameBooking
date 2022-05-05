import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/

export const SignUpSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required('Name is required'),
    surname: Yup.string().min(3).max(75).required('Surname is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});