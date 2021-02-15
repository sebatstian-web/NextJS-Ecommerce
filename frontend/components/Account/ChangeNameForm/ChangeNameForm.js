import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { updateUser } from '../../../api/user';

export default function ChangeNameForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);
  const { id, name, lastname } = user;
  const formik = useFormik({
    initialValues: {
      name,
      lastname,
    },
    validationSchema: yup.object({
      name: yup.string().trim().required(true),
      lastname: yup.string().trim().required(true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);
      const resp = await updateUser(id, formData, logout);

      if (!resp) {
        setLoading(false);
        return toast.error('Error al actualizar sus datos.');
      }

      setReloadUser(true);
      setLoading(false);
      toast.success('Datos actualizados correctamente.');
    },
  });

  return (
    <div className="change-name-form">
      <h4>Actualizar nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
            name="name"
            placeholder="Nombre"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
            name="lastname"
            placeholder="Apellidos"
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
