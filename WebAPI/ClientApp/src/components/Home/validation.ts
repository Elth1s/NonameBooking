import * as Yup from 'yup';

export const SearchSchema = Yup.object().shape({
    country: Yup.string().required('County is required'),
});