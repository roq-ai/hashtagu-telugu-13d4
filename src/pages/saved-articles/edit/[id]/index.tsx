import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getSavedArticleById, updateSavedArticleById } from 'apiSdk/saved-articles';
import { savedArticleValidationSchema } from 'validationSchema/saved-articles';
import { SavedArticleInterface } from 'interfaces/saved-article';
import { ArticleInterface } from 'interfaces/article';
import { SubscriberInterface } from 'interfaces/subscriber';
import { getArticles } from 'apiSdk/articles';
import { getSubscribers } from 'apiSdk/subscribers';

function SavedArticleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SavedArticleInterface>(
    () => (id ? `/saved-articles/${id}` : null),
    () => getSavedArticleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SavedArticleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSavedArticleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/saved-articles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SavedArticleInterface>({
    initialValues: data,
    validationSchema: savedArticleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Saved Articles',
              link: '/saved-articles',
            },
            {
              label: 'Update Saved Article',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Saved Article
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<ArticleInterface>
            formik={formik}
            name={'article_id'}
            label={'Select Article'}
            placeholder={'Select Article'}
            fetcher={getArticles}
            labelField={'title'}
          />
          <AsyncSelect<SubscriberInterface>
            formik={formik}
            name={'subscriber_id'}
            label={'Select Subscriber'}
            placeholder={'Select Subscriber'}
            fetcher={getSubscribers}
            labelField={'id'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/saved-articles')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'saved_article',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SavedArticleEditPage);
