var validator = require('validator');

exports.signup = function(req, res, next)
{
	let validationResult = validateSignupForm(req.body);
	if(!validationResult.success)
		return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
	return res.status(200).end();
}

exports.login = function(req, res, next)
{
	let validationResult = validateLoginForm(req.body);
	if(!validationResult.success)
		return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
	return res.status(200).end();
}

function validateSignupForm(payload)
{
	let isFormValid = true;
	let errors = {};
	let message = '';

	if(!payload.email || !validator.isEmail(payload.email))
	{
		isFormValid = false;
		errors.email = "Email invalido";
	}
	if(!payload.password || !validator.isLength(payload.password, 8))
	{
		isFormValid = false;
		errors.password = "La contraseña necesita ser de minimo 8 caracteres";
	}
	if(!payload.name || payload.name.trim().length === 0)
	{
		isFormValid = false;
		errors.name = "Falta el nombre";
	}
	if(!isFormValid)
	{
		message = "Revisa el formulario";
	}
	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}

function validateLoginForm(payload)
{
	let isFormValid = true;
	let errors = {};
	let message = '';

	if(!payload.email || payload.email.trim().length === 0)
	{
		isFormValid = false;
		errors.email = "Falta el mail";
	}
	if(!payload.password || payload.password.trim().length === 0)
	{
		isFormValid = false;
		errors.password = "Falta la contraseña";
	}
	if(!isFormValid)
	{
		message = "Revisa el formulario";
	}
	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}