import React from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  loadNextPage: VoidFunction
}

export const More: React.VFC<Props> = (props) => {
  return (
    <div>
      <Button
        onClick={props.loadNextPage}
        variant='light'
        style={{ boxShadow: 'none' }}
        className='bg-gray-200 text-gray-600
        font-bold rounded py-2 text-sm w-full text-center mt-2 mb-4'
      >
        More
      </Button>
    </div>
  )
}
