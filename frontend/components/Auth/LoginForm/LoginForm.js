import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { loginUser } from '../../../api/user';

const INITIAL_VALUES = {
  identifier: '',
  password: '',
};

const VALIDATION_SCHEMA = {
  identifier: yup.string().email(true).required(true),
  password: yup.string().required(true),
};

const LoginForm = ({ showRegisterForm, onCloseModal }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yup.object(VALIDATION_SCHEMA),
    onSubmit: async (formData) => {
      setLoading(true);
      const data = await loginUser(formData);

      if (!data.jwt) {
        setLoading(false);
        return toast.error(
          'Las credenciales no son válidas, vuelva a intentar.'
        );
      }

      setLoading(false);
      toast.success('Ha iniciado sesión exitosamente.');
      onCloseModal();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="login-form">
      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.identifier}
        name="identifier"
        type="text"
        placeholder="Email"
      />

      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.password}
        name="password"
        type="password"
        placeholder="Contraseña"
      />

      <div className="actions">
        <Button onClick={showRegisterForm} type="button" basic>
          Crear cuenta
        </Button>

        <div>
          <Button type="button">Recuperar contraseña</Button>

          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            className="submit"
          >
            Entrar
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
