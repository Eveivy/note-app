import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'boxicons'

export default function confirmDeleteModal({ showModal, handleClose }) {
   
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <p>Are you sure you want to delete this note?</p>
                </Modal.Body>
                <Modal.Footer className='p-0 border-0'>
                    <Button onClick={handleClose}>No</Button>
                    <Button id='confirmDel'>Yes</Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

