import * as Yup from 'yup';
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/

export const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().matches(passwordRegExp, 'OldPassword is not valid').required('OldPassword is required'),
    password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});