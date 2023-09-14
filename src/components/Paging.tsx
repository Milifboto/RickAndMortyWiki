import React from 'react'
import { useAppSelector } from '../store/storeHooks'
import { selectPaging } from '../store/slice/pagingSlice'

interface Props {
  //tipado que debe tener el useState 
  onSetUrl:  React.Dispatch<React.SetStateAction<string | null>>
}

const Paging = ({ onSetUrl }: Props) => {
  const pagingInfo = useAppSelector(selectPaging)

  return (
    <div>
      {pagingInfo.prev.page && <button onClick={() => onSetUrl(pagingInfo.prev.url)}>Prev</button>}
      {pagingInfo.current} of {pagingInfo.pages}
      {pagingInfo.next.page && <button onClick={() => onSetUrl(pagingInfo.next.url)}>Next</button>}
    </div>
  )
}

export default Paging
