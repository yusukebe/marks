import React from 'react'
import { useState, useEffect, FormEventHandler, ChangeEventHandler } from 'react'
import { getParam, removeParam, isURL } from '../util'
import { Link } from './Link'
import { InfoAlert } from './Alert'
import { Delete } from './Delete'

import { Navbar, Container, Form, Button } from 'react-bootstrap'

const App = () => {
  const [links, setLinks] = useState<Link[]>([])
  const [url, setUrl] = useState(getParam('url') || '')
  const [showInfo, setShowInfo] = useState({ show: false, url: url })

  const handleChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value)
  const handleSubmit: FormEventHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    createNewLink()
  }

  const fetchData = async () => {
    const response = await fetch('/links')
    const data: Link[] = await response.json()
    setLinks(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createNewLink = async () => {
    removeParam()

    if (!isURL(url)) {
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

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand className='w-full text-center mx-auto' href='/'>
            <h1 className='text-2xl font-bold'>Marks</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid='sm' className='pb-2 px-4'>
        <div className='flex justify-center items-center px-4'>
          <Form className='w-full flex flex-col pt-2 pb-4' onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                value={url}
                onChange={handleChange}
                className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline
              px-3 mb-3'
                type='text'
                placeholder='URL'
              />
            </Form.Group>
            <Button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 text-sm'
            >
              Add
            </Button>
          </Form>
        </div>
        <InfoAlert showInfo={showInfo} setShowInfo={setShowInfo}></InfoAlert>
        <hr className='mt-2 mb-4' />
        <div>
          <div className='items-center justify-center'>
            {links.map((link, index) => (
              <Link key={link.url} link={link} />
            ))}
          </div>
        </div>
        <address className='italic text-center pb-4'>
          <Delete />
          Marks
        </address>
      </Container>
    </div>
  )
}

export default App
