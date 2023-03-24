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
                    {visibility ?
                        <Row>
                            <Col xl={12} className="mt-3 d-flex align-items-center justify-content-between">
                                <small className='font-main text-muted text-lowercase'>{dateTime}</small>
                                <small onClick={() => setVisibility(false)} style={{ cursor: 'pointer', textDecoration: 'underline' }} className='font-main text-secondary'>Edit</small>
                            </Col>
                            <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                <div className="border-0 w-100 p-2 text-white">
                                    <p className='mb-0'>{''}</p>
                                </div>
                            </Col>
                            <Col xl={12} className="mt-3">
                                <div className='w-100 p-2'>{''}</div>
                            </Col>
                        </Row> :
                        <Form>
                            <Row>
                                <Col xl={12} className="mt-3">
                                    <small className='font-main text-muted text-lowercase'>{others.vals.dateTime}</small>
                                </Col>
                                <Col xl={12} className="mt-3 rounded-pill" style={{ backgroundColor: "#261f47" }}>
                                    <Form className='border-0 w-100 p-2 text-white' as="input" name="title" onChange={handleEdit} value={editData.title} placeholder="Note title" />
                                </Col>
                                <Col xl={12} className="mt-3">
                                    <Form className='border-0 w-100 p-2 rm-default' autoFocus as="textarea" rows={10} name="note" placeholder='Note down something' onChange={handleEdit} value={editData.note} />
                                </Col>
                                <Col xl={12} className="mt-4 d-flex align-items-end justify-content-end p-3">
                                    <Button type="submit" className='me-3 rounded-circle d-flex align-items-center py-2 px-2' style={{ backgroundColor: "#261f47" }}>
                                        <box-icon name='check' size="2rem" color="white" ></box-icon>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>}
                </Modal.Body>

            </Modal>
        </>
    );
}
