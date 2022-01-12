import * as Yup from 'yup';

export const SearchSchema = Yup.object().shape({
    countryId: Yup.string().required('County is required'),
});