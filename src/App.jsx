import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NoteModal from './Components/NoteModal';
import ConfirmDeleteModal from './Components/ConfirmDeleteModal';
import 'boxicons'
import { Modal } from 'bootstrap';

function App() {
  const [show, setShow] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  const [notes, setNotes] = useState(localStorage.getItem('notes') == null ? [] : JSON.parse(localStorage.getItem('notes')));
  const today = new Date();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleClose = () => setShowDelModal(false);
  const toggleShow = () => setShowDelModal(true);

  const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  const onSubmit = (values, actions) => {
    actions.resetForm()
    values.id = today.getMilliseconds();
    values.dateTime = `${time}, ${date}`

    setNotes(prevNotes => {
      return [...prevNotes, values]
    })
  }

  const [id, setId] = useState('');
  const [noteVals, setNoteVals] = useState({});
  const [elementKey, setElementKey] = useState(null)


  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (ev, key) => {
    setNotes((current) =>
      current.filter((note) => note.id !== key)
    );
    setShowDelModal(false)
  }

  const handleClick = (ev, key) => {
    console.log(ev.target)
    if (ev.target.id === "delete") {
      setElementKey(key)
      setShowDelModal(true)
    } else {
      setShow(true)
      setId(key)

      const found = notes.find(el => {
        return el.id === key
      });
      // console.log(key)
      setNoteVals(found)
    }
  };

  const noteGrids = notes.map((note, idx) => {
    const bgs = ['#2230c5', '#8a2584', '#14857c', '#d1b910', '#962374', '#b51f5d', '#6529a2', '#322eb9', '#26da0e', '#123569']
    const selectedVariant = bgs[idx % bgs.length];
    return (
      <Col xl={6} id={note.id} key={note.id} onClick={event => handleClick(event, note.id)}>
        <div className="rounded-3" style={{
          backgroundColor: selectedVariant,
          cursor: 'pointer',
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}>
          <div className="d-flex justify-content-between">
            <p className='pb-5 p-3 font-main text-white note-title'>{note.title || 'Untitled'}</p>

            <span className='p-3' style={{ cursor: 'pointer' }}><box-icon id='delete' title="delete note" name='trash-alt' color="red" size="1.5rem"></box-icon></span>

          </div>
          <p className='text-muted p-3 text-end' style={{ fontSize: '12px' }}>{note.dateTime}</p>
        </div>
      </Col>
    )
  })

  return (
    <div className="App">
      <NoteModal id={id} vals={noteVals} show={show} handleClose={handleClose} today={today} onSubmit={onSubmit} />
      <ConfirmDeleteModal showModal={showDelModal} handleClose={toggleClose} handleDelete={handleDelete} elKey={elementKey} />
      <Container className='notes-container p-xl-5'>
        {notes.length > 0 &&
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center search-input-div'>
              <box-icon color="white" size="20px" name='search-alt-2'></box-icon>
              <Form as='input' className="text-white" name='search' id='search' placeholder='Search note' />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <span id='addNoteIcon' title='add new note' onClick={handleShow} className='d-flex align-items-center rounded-3' style={{ backgroundColor: "red", cursor: 'pointer' }}>
                <box-icon size="2.5rem" color="white" name='plus' ></box-icon>
              </span>
            </div>
          </div>
        }
        <Row className='mt-3 g-5'>
          {
            notes.length === 0 ? <Col xl={12} className="d-flex align-items-center justify-content-center ">
              <div className="d-flex align-items-center justify-content-center flex-column pb-5">
                <p>You have not added any note yet</p>
                <Button id='addNoteBtn' variant='danger' onClick={handleShow}>Add now</Button>
              </div>
            </Col> : noteGrids
          }

        </Row>
      </Container>
    </div>
  )
}

export default App
