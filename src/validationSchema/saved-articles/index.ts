import * as yup from 'yup';

export const savedArticleValidationSchema = yup.object().shape({
  article_id: yup.string().nullable().required(),
  subscriber_id: yup.string().nullable().required(),
});
