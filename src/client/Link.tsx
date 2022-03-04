import React from 'react'
import { Image } from 'react-bootstrap'
import { isURL, truncateString } from '../util'
import type { Link } from '../types'

type Props = {
  link: Link
}

export const List: React.VFC<Props> = (props) => {
  const link = props.link

  if (!isURL(link.url)) return <div></div>

  return (
    <div className='mb-4'>
      <a href={link.url} className='no-underline' target='_blank'>
        <div className='p-2 bg-white flex items-center rounded-md shadow-md hover:scale-105 transition transform duration-500 cursor-pointer'>
          <div className=''>
            <Image src={link.image} className='w-24 h-24 object-cover max-w-none' rounded />
          </div>
          <div className=' px-2'>
            <h2 className='text-sm font-bold text-gray-700 break-all mb-0'>
              {link.title || link.url}
            </h2>
            <p className='text-gray-400 text-xs mb-1'>{new URL(link.url).hostname}</p>
            <p className='text-gray-600 text-xs'>{truncateString(link.description || '', 40)}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
