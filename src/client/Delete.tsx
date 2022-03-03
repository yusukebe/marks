import React from 'react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { isURL } from '../util'

type Data = {
  deleted: boolean | undefined
}

export const Delete = () => {
  const [show, setShow] = useState(false)
  const [url, setURL] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setURL(e.target.value)
  const handleSubmit: FormEventHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    deleteLink()
  }

  const deleteLink = async () => {
    if (!isURL(url)) return

    const body = JSON.stringify({ url: url })
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/links', { method: 'DELETE', headers, body })
    if (!response.ok) {
      return
    }
    const data: Data = await response.json()
    if (data.deleted) {
      setURL('')
      setShow(false)
    }
  }

  return (
    <div>
      <Button variant='link' onClick={handleShow} className='italic no-underline text-black pb-0'>
        Delete Link
      </Button>
      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Link</Modal.Title>
        </Modal.Header>

        <Form className='w-full flex flex-col pt-2 pb-4' onSubmit={handleSubmit}>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              type='submit'
              className='font-bold rounded py-2 px-4 text-sm'
              variant='outline-danger'
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
