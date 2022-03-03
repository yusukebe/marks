import React from 'react'
import { CloseButton, Alert } from 'react-bootstrap'

export type ShowInfo = {
  show: boolean
  url: string
}

type Props = {
  showInfo: ShowInfo
  setShowInfo: Function
}

export const InfoAlert: React.VFC<Props> = (props) => {
  return (
    <Alert show={props.showInfo.show} variant='success'>
      <p>{props.showInfo.url} is added!</p>
      <div className='d-flex justify-content-end'>
        <CloseButton
          onClick={() => props.setShowInfo({ show: false, url: props.showInfo.url })}
        ></CloseButton>
      </div>
    </Alert>
  )
}
