import React from 'react'

interface Props {
    error: string;
}

const ZodErrors = ({error}:Props) => {
  return (
    <div className='text-red-500 italic text-sm'>
      {error}
    </div>
  )
}

export default ZodErrors
