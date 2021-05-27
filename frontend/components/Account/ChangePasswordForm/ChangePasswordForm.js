import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { updateUserPassword } from '../../../api/user';

export default function ChangePasswordForm({ user, logout }) {
  const [loading, setLoading] = useState(false);
  const { id } = user;
  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .trim()
        .required(true)
        .oneOf([yup.ref('repeatPassword')], true),
      repeatPassword: yup
        .string()
        .trim()
        .required(true)
        .oneOf([yup.ref('password')], true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);
      const data = await updateUserPassword(id, formData.password, logout);

      if (!data) {
        setLoading(false);
        return toast.error('Error al actualizar la contraseña.');
      }

      setLoading(false);
      logout();
      toast.success(
        'Contraseña actualizado correctamente, vuelva a iniciar sesión.'
      );
    },
  });

  return (
    <div className="change-password-form">
      <h4>Actualizar contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            type="password"
            name="password"
            placeholder="Contraseña"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            type="password"
            name="repeatPassword"
            placeholder="Confirmar contraseña"
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
