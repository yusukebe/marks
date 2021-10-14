const { useState, useEffect } = React

const App = () => {
  const [links, setLinks] = useState([])
  const [url, setUrl] = useState(getParam('url') || '')
  const [showInfo, setShowInfo] = useState({ show: false, url: url })

  const fetchData = async () => {
    const response = await fetch('/links')
    const data = await response.json()
    setLinks(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createNewLink = async () => {
    removeParam()

    if (!isUrl(url)) {
      return
    }

    const body = JSON.stringify({ url: url })
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/links', { method: 'POST', headers, body })
    if (!response.ok) {
      return
    }
    setShowInfo({ show: true, url: url })
    setUrl('')
    fetchData()
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNewLink()
  }

  const Container = ReactBootstrap.Container
  const Button = ReactBootstrap.Button
  const Form = ReactBootstrap.Form
  const FormControl = ReactBootstrap.FormControl
  const Navbar = ReactBootstrap.Navbar
  const Nav = ReactBootstrap.Nav

  return (
    <div>
      <Navbar expand="true">
        <Container>
          <Navbar.Brand className="w-full text-center mx-auto" href="/">
            <h1 className="text-2xl font-bold">Marks</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid="sm" className="pb-2 px-4">
        <div className="flex justify-center items-center px-4">
          <Form
            className="w-full flex flex-col pt-2 pb-4"
            onSubmit={handleSubmit.bind(this)}
          >
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
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 text-sm"
            >
              Add
            </Button>
          </Form>
        </div>
        <InfoAlert showInfo={showInfo} setShowInfo={setShowInfo}></InfoAlert>
        <hr className="mt-2 mb-4" />
        <div>
          <div className="items-center justify-center">
            {links.map((link, index) => (
              <Link key={link.key} link={link} />
            ))}
          </div>
        </div>
        <address class="italic text-center pb-4">
          <Delete />
          Marks
        </address>
      </Container>
    </div>
  )
}

const target = document.querySelector('#app')
ReactDOM.render(<App />, target)
