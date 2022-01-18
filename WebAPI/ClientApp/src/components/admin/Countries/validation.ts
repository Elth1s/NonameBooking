import * as Yup from 'yup';

export const CountrySchema = Yup.object().shape({
    name: Yup.string().label("Name").min(2).max(60).required('Name is required.'),
    code: Yup.string().label("Code").length(2).required('Code is required.'),
});