import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import 'boxicons'

export default function NoteModal({ show, handleClose, onSubmit, ...otherProps }) {
    const date = otherProps.today.getFullYear() + '-' + (otherProps.today.getMonth() + 1) + '-' + otherProps.today.getDate();
    const time = otherProps.today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const dateTime = date + ' | ' + time;

    const { values, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            note: '',
            title: '',
            id: 0,
            dateTime: ''
        },
        onSubmit,
    });
 
    const [editForm, setEditForm] = useState({
        note: otherProps.vals.note,
        title: otherProps.vals.title,
        dateTime: otherProps.vals.dateTime,
        id: otherProps.vals.id
    })
 
    const[noteT, setNoteT] = useState(otherProps.vals.title)

    // console.log(otherProps.vals)
    console.log(editForm)
    console.log(noteT)
    return (
        <>
            <Modal show={show} onHide={handleClose}> 
                    <Modal.Body>
                      {  otherProps.id === 'noteTitle' ? <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xl={12} className="mt-3">
                                    <small className='font-main text-muted text-lowercase'>{editForm.dateTime}</small>
                                </Col>
                                <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                    <Form className='border-0 w-100 p-2 text-white' as="input" name="title" onChange={handleChange} value={editForm.title} placeholder="Note title" />
                                </Col>
                                <Col xl={12} className="mt-3">
                                    <Form className='border-0 w-100 p-2' as="textarea" rows={10} name="note" placeholder='Note down something'  onChange={handleChange} value={editForm.note} />
                                </Col>
                                {
                                    values.note && <Col xl={12} className="mt-4 d-flex align-items-end justify-content-end p-3">
                                        <Button disabled={isSubmitting} onClick={handleClose} type="submit" className='me-3 rounded-circle d-flex align-items-center py-2 px-2' style={{ backgroundColor: "#261f47" }}>
                                            <box-icon name='check' size="2rem" color="white" ></box-icon>
                                        </Button>
                                    </Col>
                                }

                            </Row>
                        </Form> :
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xl={12} className="mt-3">
                                    <small className='font-main text-muted text-lowercase'>{dateTime}</small>
                                </Col>
                                <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                    <Form className='border-0 w-100 p-2 text-white' as="input" name="title"
                                        onBlur={handleBlur} onChange={handleChange} value={values.title} placeholder="Note title" />
                                </Col>
                                <Col xl={12} className="mt-3">
                                    <Form className='border-0 w-100 p-2' as="textarea" rows={10} name="note" placeholder='Note down something'
                                        onBlur={handleBlur} onChange={handleChange} value={values.note} />
                                </Col>
                                {
                                    values.note && <Col xl={12} className="mt-4 d-flex align-items-end justify-content-end p-3">
                                        <Button disabled={isSubmitting} onClick={handleClose} type="submit" className='me-3 rounded-circle d-flex align-items-center py-2 px-2' style={{ backgroundColor: "#261f47" }}>
                                            <box-icon name='check' size="2rem" color="white" ></box-icon>
                                        </Button>
                                    </Col>
                                }

                            </Row>
                        </Form>
                        }
                    </Modal.Body>  
                {/* {
                    otherProps.showContent.current.id === 'delete' && <Modal.Body>
                        <p>Are you sure you want to delete this note?</p>
                        <Modal.Footer className='p-0 border-0'>
                            <Button onClick={hideModal}>No</Button>
                            <Button onClick={handleDelete}>Yes</Button>
                        </Modal.Footer></Modal.Body>
                } */}
            </Modal>
        </>
    );
}
