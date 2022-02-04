import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = (translate) => yup.object({
  email: yup
    .string()
    .email(translate('validation.EnterValidEmail'))
    .required(translate('validation.FieldIsRequired')),

});
