import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { registerUser } from '../../../api/user';

const INITIAL_VALUES = {
  name: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
};

const VALIDATION_SCHEMA = {
  name: yup.string().required(true),
  lastname: yup.string().required(true),
  username: yup.string().required(true),
  email: yup.string().email(true).required(true),
  password: yup.string().required(true),
};

const RegisterForm = ({ showLoginForm }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yup.object(VALIDATION_SCHEMA),
    onSubmit: async (formData) => {
      setLoading(true);
      const data = await registerUser(formData);

      if (!data.jwt) {
        setLoading(false);
        return toast.error(
          'Error al crear la nueva cuenta, el usuario ya existe.'
        );
      }

      setLoading(false);
      toast.success('Cuenta creada exitosamente, puede iniciar sesión.');
      showLoginForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="login-form">
      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.name}
        name="name"
        type="text"
        placeholder="Nombre"
      />

      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.lastname}
        name="lastname"
        type="text"
        placeholder="Apellido"
      />

      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.username}
        name="username"
        type="text"
        placeholder="Usuario"
      />

      <Form.Input
        onChange={formik.handleChange}
        error={formik.errors.email}
        name="email"
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
        <Button onClick={showLoginForm} type="button" basic>
          Iniciar sesión
        </Button>

        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className="submit"
        >
          Crear cuenta
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
