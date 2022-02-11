import PropTypes from 'prop-types';
import { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { LabelInput } from './ContactForm.styled';
import Button from '../Button';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    )
    .required('Please enter your name, it is required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits (at least 5 symbols long), it can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Please enter your phone number, it is required'),
});

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleContactInput = ({ name, number }) => {
    this.setState({ name, number });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Formik
        enableReinitialize
        initialValues={{ name, number }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.handleContactInput(values);
          this.props.submit(values);
          this.handleContactInput({ name: '', number: '' });
          setSubmitting(false);
        }}
      >
        <Form autoComplete="off">
          <LabelInput>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" />
          </LabelInput>

          <LabelInput>
            Number
            <Field type="tel" name="number" />
            <ErrorMessage name="number" />
          </LabelInput>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
