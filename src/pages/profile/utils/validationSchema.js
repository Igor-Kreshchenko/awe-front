import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = (translate) => yup.object({
  firstName: yup
    .string()
    .required(translate('validation.FieldIsRequired')),
  secondName: yup
    .string()
    .required(translate('validation.FieldIsRequired')),
  email: yup
    .string()
    .email(translate('validation.EnterValidEmail'))
    .required(translate('validation.FieldIsRequired')),
  birthDate: yup
    .date()
    .max(
      new Date(Date.now() - 567648000000),
      translate('validation.Want18Years')
    )
    .required(translate('validation.FieldIsRequired'))
    .typeError(translate('validation.InvalidDate')),
  telNumber: yup
    .string()
    .matches(phoneRegExp, translate('validation.InvalidPhone'))
    .required(translate('validation.FieldIsRequired')),
});
