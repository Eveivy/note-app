import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { useFormik } from 'formik';
import 'boxicons'

export default function EditNoteModal({ showEditModal, closeEditModal, ...otherProps}) {
    const date = otherProps.today.getFullYear() + '-' + (otherProps.today.getMonth() + 1) + '-' + otherProps.today.getDate();
    const time = otherProps.today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const dateTime = date + ' | ' + time;

   
    const editData  = {
        title: otherProps.vals.title,
        note: otherProps.vals.note
    }
    console.log(otherProps.vals.title)

    const handleEdit = ({ target, value }) => {
        // setEditData(prev => {
        //     return {
        //         ...prev,
        //         [target.name]: value
        //     }
        // })
    }


    
    return (
        <>
            <Modal show={showEditModal} onHide={closeEditModal}>
                <Modal.Body>
                    <Form> 
                        <Row>
                            <Col xl={12} className="mt-3">
                                <small className='font-main text-muted text-lowercase'>{otherProps.vals.dateTime}</small>
                            </Col>
                            <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                <Form className='border-0 w-100 p-2 text-white' as="input" name="title" onChange={handleEdit} value={editData.title} placeholder="Note title" />
                            </Col>
                            <Col xl={12} className="mt-3">
                                <Form className='border-0 w-100 p-2' as="textarea" rows={15} name="note" placeholder='Note down something' onChange={handleEdit} value={editData.note} />
                            </Col>
                            <Col xl={12} className="mt-4 d-flex align-items-end justify-content-end p-3">
                                <Button type="submit" className='me-3 rounded-circle d-flex align-items-center py-2 px-2' style={{ backgroundColor: "#261f47" }}>
                                    <box-icon name='check' size="2rem" color="white" ></box-icon>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
