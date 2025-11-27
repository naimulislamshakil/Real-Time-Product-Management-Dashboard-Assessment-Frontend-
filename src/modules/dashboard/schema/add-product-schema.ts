import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
	productName: yup.string().required('Product name is required.'),
	price: yup
		.number()
		.typeError('Product price must be a number.')
		.required('Product price is required.')
		.positive('Price must be greater than 0'),
	stock: yup
		.number()
		.typeError('Stock must be a number.')
		.required('Stock qty is required.')
		.integer('Stock must be an integer')
		.min(0, 'Stock must be at least 0'),
	category: yup.string().required('Category is required.'),
	status: yup.string().required('Product status required.'),
	description: yup.string(),
	image: yup.string().required('Product image is required.'),
});
