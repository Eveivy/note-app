import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'boxicons'

export default function confirmDeleteModal({ showModal, handleClose, handleDelete, elKey}) {
   
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <p className='font-main'>Are you sure you want to delete this note?</p>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                    <Button variant='warning' onClick={handleClose}>No</Button>
                    <Button variant='danger' onClick={e => handleDelete(e, elKey)}>Yes</Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

