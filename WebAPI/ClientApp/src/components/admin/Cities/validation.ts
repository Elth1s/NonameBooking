import * as Yup from 'yup';

export const CitySchema = Yup.object().shape({
    name: Yup.string().min(2).max(90).required('Name is required'),
    countryId: Yup.string().required('Country is required'),
});