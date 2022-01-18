import * as Yup from 'yup';

export const FilterSchema = Yup.object().shape({
    name: Yup.string().label("Name").min(2).max(90).required('Name is required'),
    filterGroupId: Yup.string().required('Filter group is required'),
});