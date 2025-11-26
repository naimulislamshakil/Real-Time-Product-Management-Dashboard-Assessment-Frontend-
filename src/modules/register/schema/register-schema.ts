import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	fullName: yup.string().required('Name is required'),

	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),

	phone: yup
		.string()
		.matches(/^01[3-9]\d{8}$/, 'Invalid phone number')
		.required('Phone number is required'),

	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required'),
});
