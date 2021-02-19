import { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { createAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

const INITIAL_VALUES = {
  title: '',
  name: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
};

const VALIDATION_SCHEMA = {
  title: yup.string().trim().required(true),
  name: yup.string().trim().required(true),
  address: yup.string().trim().required(true),
  city: yup.string().trim().required(true),
  state: yup.string().trim().required(true),
  postalCode: yup.string().trim().required(true),
  phone: yup.string().trim().required(true),
};

export default function AddressForm({ setShowModal, setReloadAddress }) {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yup.object(VALIDATION_SCHEMA),
    onSubmit: (formData) => {
      createAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };

    const data = await createAddressApi(formDataTemp, logout);

    if (!data) {
      setLoading(false);
      return toast.error('Error al guardar la dirección.');
    }

    formik.resetForm();
    setLoading(false);
    setShowModal(false);
    setReloadAddress(true); // Para recargar las direcciones sin hacer refresh
    toast.success('Se guardo exitosamente la nueva dirección.');
  };

  return (
    <div className="address-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
          type="text"
          name="title"
          label="Nombre de la dirección"
        />

        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
            type="text"
            name="name"
            label="Nombre y apellidos"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.errors.address}
            type="text"
            name="address"
            label="Dirección"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
            type="text"
            name="city"
            label="Ciudad"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.state}
            error={formik.errors.state}
            type="text"
            name="state"
            label="Estado / Provincia / Región"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.postalCode}
            error={formik.errors.postalCode}
            type="text"
            name="postalCode"
            label="Código postal"
          />

          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
            type="text"
            name="phone"
            label="Teléfono"
          />
        </Form.Group>

        <div style={{ textAlign: 'right' }}>
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            className="submit"
          >
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}
