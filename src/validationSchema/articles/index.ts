import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  sector: yup.string().required(),
  publisher_id: yup.string().nullable().required(),
});
