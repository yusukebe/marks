const Delete = (props) => {
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <Button variant="link" onClick={handleShow}>
        Delete Link
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Link</Modal.Title>
        </Modal.Header>

        <Form
          className="w-full flex flex-col pt-2 pb-4"
          onSubmit={handleSubmit.bind(this)}
        >
          <Modal.Body>
            <Form.Group>
              <Form.Control
                value={url}
                onChange={handleChange}
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline
              px-3 mb-3"
                type="text"
                placeholder="URL"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              className="font-bold rounded py-2 px-4 text-sm"
              variant="danger"
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
