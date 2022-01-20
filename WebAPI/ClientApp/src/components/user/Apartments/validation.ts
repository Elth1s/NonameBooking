import * as Yup from 'yup';

export const ApartmentSchema = Yup.object().shape({
    name: Yup.string().label("Name").min(2).max(90).required('Name is required'),
    countryId: Yup.string().required('Country is required'),
    cityId: Yup.string().required('City is required'),
    description: Yup.string().label("Description").min(2).max(250).required('Description is required'),
    price: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required('Price is required'),
    typeOfApartmentId: Yup.string().required('Type is required'),
    address: Yup.string().label("Address").min(2).max(250).required('Address is required'),
    beds: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required("Beds is required"),
    bathrooms: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required("Bathrooms is required"),
    bedrooms: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required("Bedrooms is required"),
});