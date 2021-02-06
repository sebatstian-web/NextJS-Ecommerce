import { Modal, Icon } from 'semantic-ui-react';

const BasicModal = ({ show, setShow, title, children, ...rest }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal open={show} onClose={handleClose} {...rest} className="basic-modal">
      <Modal.Header>
        <span>{title}</span>
        <Icon name="close" onClick={handleClose} />
      </Modal.Header>

      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default BasicModal;
