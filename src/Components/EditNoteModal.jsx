import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { useFormik } from 'formik';
import 'boxicons'

export default function EditNoteModal({ showEditModal, closeEditModal, ...others }) {

    const date = others.today.getFullYear() + '-' + (others.today.getMonth() + 1) + '-' + others.today.getDate();
    const time = others.today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const dateTime = date + ' | ' + time;

    const [visibility, setVisibility] = useState(true)

    others.setOldNote(others.exactEl)

    console.log(others.oldNote)

    // let editData = others.vals
    //  console.log(editData)

    // const [editedVals, setEditedVals] = useState({
    //     t: editData.title,
    //     n: '',
    //     td: dateTime
    // });
    // console.log(editedVals.t)
    const handleEdit = () => {

    }
    // const toggleVisibility = 



    return (
        <>
            <Modal show={showEditModal} onHide={closeEditModal}>
                <Modal.Body>
                    <Form className='mb-5 pb-5'>
                        <Row>
                            <Col xl={12} className="mt-3">
                                <small className='font-main text-muted text-lowercase'>{`${others.oldNote.time} | ${others.oldNote.date}`}</small>
                            </Col>
                            <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                <div className='border-0 w-100 p-2 text-white'>{others.oldNote.title }</div>  
                            </Col>
                            <Col xl={12} className="mt-3">
                                <div className='border-0 w-100 p-2'>{others.oldNote.note}</div>
                            </Col>
                            {/* <Col xl={12} className="mt-4 d-flex align-items-end justify-content-end p-3">
                                <Button type="submit" className='me-3 rounded-circle d-flex align-items-center py-2 px-2' style={{ backgroundColor: "#261f47" }}>
                                    <box-icon name='check' size="2rem" color="white" ></box-icon>
                                </Button>
                            </Col> */}
                        </Row>
                    </Form>
                    
                </Modal.Body>

            </Modal>
        </>
    );
}
