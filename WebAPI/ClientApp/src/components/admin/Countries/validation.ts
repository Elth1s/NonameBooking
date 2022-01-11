import * as Yup from 'yup';

export const CountrySchema = Yup.object().shape({
    country: Yup.string().min(2).max(60).required('County is required'),
});