import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/sentiment_check_ins/sentiment_check_insSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditSentiment_check_ins = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    child: '',

    response: '',

    sentiment: '',

    check_in_date: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { sentiment_check_ins } = useAppSelector(
    (state) => state.sentiment_check_ins,
  );

  const { sentiment_check_insId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: sentiment_check_insId }));
  }, [sentiment_check_insId]);

  useEffect(() => {
    if (typeof sentiment_check_ins === 'object') {
      setInitialValues(sentiment_check_ins);
    }
  }, [sentiment_check_ins]);

  useEffect(() => {
    if (typeof sentiment_check_ins === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = sentiment_check_ins[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [sentiment_check_ins]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: sentiment_check_insId, data }));
    await router.push('/sentiment_check_ins/sentiment_check_ins-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit sentiment_check_ins')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit sentiment_check_ins'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Child' labelFor='child'>
                <Field
                  name='child'
                  id='child'
                  component={SelectField}
                  options={initialValues.child}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Response' hasTextareaHeight>
                <Field name='response' as='textarea' placeholder='Response' />
              </FormField>

              <FormField label='Sentiment' labelFor='sentiment'>
                <Field name='sentiment' id='sentiment' component='select'>
                  <option value='positive'>positive</option>

                  <option value='neutral'>neutral</option>

                  <option value='negative'>negative</option>
                </Field>
              </FormField>

              <FormField label='Check-inDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.check_in_date
                      ? new Date(
                          dayjs(initialValues.check_in_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, check_in_date: date })
                  }
                />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/sentiment_check_ins/sentiment_check_ins-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditSentiment_check_ins.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SENTIMENT_CHECK_INS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSentiment_check_ins;
