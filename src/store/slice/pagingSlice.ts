import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPageNumer } from '../../utils/utils'
import type { RootState } from '../store'
import type { InfoResponse } from './characterSlice'

interface PagingState {
  pages: number | null
  current: number
  next: {
    page: number | null
    url: string | null
  }
  prev: {
    page: number | null
    url: string | null
  }
}

const initialState: PagingState = {
  pages: null,
  current: 1,
  next: {
    page: 2,
    url: '',
  },
  prev: {
    page: null,
    url: '',
  },
}

const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setPaging: (state, action: PayloadAction<InfoResponse>) => {
      const nextPage = action.payload.next !== null ? getPageNumer(action.payload.next) : null
      const prevPage = action.payload.prev !== null ? getPageNumer(action.payload.prev) : null

      state.pages = action.payload.pages
      state.current = nextPage ? nextPage - 1: prevPage ? prevPage + 1 : 1
      state.next = {
        page: nextPage,
        url: action.payload.next,
      }
      state.prev = {
        page: prevPage,
        url: action.payload.prev,
      }
    },
  },
})

export const { setPaging } = pagingSlice.actions
export const selectPaging = (state: RootState) => state.paging

export default pagingSlice.reducer
