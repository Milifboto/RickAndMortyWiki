import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './slice/characterSlice'
import pagingReducer from './slice/pagingSlice'

const store = configureStore({
  reducer: {
    character: characterReducer,
    paging: pagingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
