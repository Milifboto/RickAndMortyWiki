import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import {
  selectCharacterCollection,
  selectCollectionStatus,
  selectCollectionError,
  fetchCharacterCollection,
} from '../../store/slice/characterSlice'

import { useEffect } from 'react'

export const useGetCharacterCollection = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectCollectionStatus)
  const collection = useAppSelector(selectCharacterCollection)
  const error = useAppSelector(selectCollectionError)

  useEffect(() => {
    dispatch(fetchCharacterCollection())
  }, [dispatch])

  const isUninitialized = status === 'idle'
  const isLoading = status === 'loading'
  const isError = status === 'failed'
  const isSuccess = status === 'succeeded'

  return { collection, isUninitialized, isLoading, isError, error, isSuccess }
}
