import { useState } from 'react';
import Link from 'next/link';

import { Image, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

import BasicModal from '../../Modal/BasicModal';

export default function Order({ order }) {
  const [showModal, setShowModal] = useState(false);
  const { game, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = game;

  return (
    <>
      <div className="order">
        <div className="order__info">
          <Link href={`/${url}`}>
            <a>
              <Image src={poster.url} alt={title} />
            </a>
          </Link>

          <div className="order__info-data">
            <h2>{title}</h2>
            <p>{totalPayment}</p>
          </div>
        </div>

        <div className="order__other">
          <p className="order__other-date">
            {format(new Date(createdAt), 'PPpp', { locale: es })}
          </p>
          <Icon onClick={() => setShowModal(true)} name="eye" circular link />
        </div>
      </div>

      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal({ showModal, setShowModal, addressShipping, title }) {
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      title={title}
      size="tiny"
    >
      <h3>Datos del envío:</h3>
      <p>Dirección: {addressShipping.address}</p>
      <p>
        Ciudad: {addressShipping.state}, {addressShipping.city}
      </p>
      <p>Teléfono: {addressShipping.phone}</p>
    </BasicModal>
  );
}
