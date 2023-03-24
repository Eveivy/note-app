import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NoteModal from './Components/NoteModal';
import ConfirmDeleteModal from './Components/ConfirmDeleteModal';
import EditNoteModal from './Components/EditNoteModal';
import 'boxicons'
import { Modal } from 'bootstrap';

function App() {
  const [show, setShow] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [randColor, setRandColor] = useState('#6529a2');

  const [notes, setNotes] = useState(localStorage.getItem('notes') == null ? [] : JSON.parse(localStorage.getItem('notes')));
  const today = new Date();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleClose = () => setShowDelModal(false);

  const handleEditShow = () => setShowEditModal(true);
  const handleEditClose = () => setShowEditModal(false);

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

  const [noteVals, setNoteVals] = useState({});
  const [elementKey, setElementKey] = useState(null);

  const [inputVal, setInputVal] = useState('');
  const filterNote = notes.filter((el) => {
    return el.title.toLocaleLowerCase().includes(inputVal)
  }
  );


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
    if (ev.target.id === "delete") {

      setElementKey(key);

      setShowDelModal(true);

    } else {

      setShowEditModal(true);

      const found = notes.find(el => {
        return el.id === key
      });

      setNoteVals(found)
    }
  };

  const noteGrids = filterNote.map((note, idx) => {
    const bgs = ['#d1b910', '#962374', '#b51f5d', '#2230c5', '#8a2584', '#14857c', '#6529a2', '#322eb9', '#26da0e', '#123569'];
    const selectedVariant = bgs[idx % bgs.length];
    return (
      <Col xl={6} id={note.id} key={note.id} onClick={event => handleClick(event, note.id)}>
        <div className="rounded-3" style={{
          backgroundColor: selectedVariant,
          cursor: 'pointer',
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}>
          <div className="d-flex justify-content-between">
            <p className='pb-5 p-3 font-main text-white note-title text-capitalize'>{note.title || 'Untitled'}</p>

            <span className='p-3' style={{ cursor: 'pointer' }}><box-icon id='delete' title="delete note" name='trash-alt' color="red" size="1.5rem"></box-icon></span>

          </div>
          <p className='text-muted p-3 text-end' style={{ fontSize: '12px' }}>{note.dateTime}</p>
        </div>
      </Col>
    )
  })

  return (
    <div className="App">
      <NoteModal show={show} handleClose={handleClose} today={today} onSubmit={onSubmit} />
      <ConfirmDeleteModal showModal={showDelModal} handleClose={toggleClose} handleDelete={handleDelete} elKey={elementKey} />
      <EditNoteModal vals={noteVals} today={today} showEditModal={showEditModal} closeEditModal={handleEditClose} />
      <Container className='notes-container p-xl-5'>
        {notes.length > 0 &&
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center search-input-div'>
              <box-icon color="white" size="20px" name='search-alt-2'></box-icon>
              <Form onChange={(event) => setInputVal(event.target.value)} as='input' className="text-white" name='search' id='search' placeholder='Search note' />
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
            </Col> : (
              filterNote.length ? (
                noteGrids
              ) : (
                <p className='w-100' style={{fontSize: '17px', textAlign: 'center' }} >
                  No result found for the searched keyword
                </p>
              ) 
            )
          }

        </Row>
      </Container>
    </div>
  )
}

export default App
