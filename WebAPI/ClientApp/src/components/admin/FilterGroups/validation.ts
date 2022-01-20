import * as Yup from 'yup';

export const FilterGroupSchema = Yup.object().shape({
    name: Yup.string().label("Name").min(2).max(60).required('Name is required'),
});