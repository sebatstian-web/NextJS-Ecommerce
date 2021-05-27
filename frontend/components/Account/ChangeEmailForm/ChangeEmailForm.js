import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { updateUserEmail } from '../../../api/user';

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);
  const { id, email } = user;
  const formik = useFormik({
    initialValues: {
      email: '',
      repeatEmail: '',
    },
    validationSchema: yup.object({
      // oneOf permite comparar que los emails sean iguales
      email: yup
        .string()
        .trim()
        .email(true)
        .required(true)
        .oneOf([yup.ref('repeatEmail')], true),
      repeatEmail: yup
        .string()
        .trim()
        .email(true)
        .required(true)
        .oneOf([yup.ref('email')], true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);
      const data = await updateUserEmail(id, formData.email, logout);

      if (!data || data?.statusCode === 400) {
        setLoading(false);
        return toast.error('Error al actualizar el email.');
      }

      setReloadUser(true);
      setLoading(false);
      toast.success('Email actualizado exitosamente.');
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Actualizar email
        <span>Email actual: {email}</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            name="email"
            placeholder="Email"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
            name="repeatEmail"
            placeholder="Confirmar email"
          />
        </Form.Group>
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className="submit"
        >
          Guardar
        </Button>
      </Form>
    </div>
  );
}
