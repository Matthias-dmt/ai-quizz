import React from 'react'

type Props = {
  value: number
}

const progressBar = (props: Props) => {
  return (
    <div className='w-full bg-secondary rounded-full h-2.5'>
      <div
        className='bg-primary rounded-md h-2.5'
        style={{
          width: `${props.value}%`,
        }}
      >
      </div>
    </div>
  )
}

export default progressBar