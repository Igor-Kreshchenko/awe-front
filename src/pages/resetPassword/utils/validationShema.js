import * as yup from 'yup';

export const validationSchema = (translate) => yup.object({
  password: yup
    .string()
    .min(8, translate('validation.Min8Char'))
    .required(translate('validation.FieldIsRequired')),
  confirmPassword: yup
    .string()
    .min(8, translate('validation.Min8Char'))
    .required(translate('validation.FieldIsRequired'))
    .oneOf([ yup.ref('password'), null ], translate('validation.PasswordsMustMatch')),

});
