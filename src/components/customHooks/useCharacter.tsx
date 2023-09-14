import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import {
  selectCharacterCollection,
  selectCollectionStatus,
  selectCollectionError,
  fetchCharacterCollection,
  setDetail,
} from '../../store/slice/characterSlice'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CharacterType } from '../../types/character'
import { useState } from 'react'

export const useGetCharacterCollection = () => {
  const dispatch = useAppDispatch()

  const [url, setUrl] = useState<string | null>(null)

  const status = useAppSelector(selectCollectionStatus)
  const collection = useAppSelector(selectCharacterCollection)
  const error = useAppSelector(selectCollectionError)
  useEffect(() => {
    dispatch(fetchCharacterCollection(url))
  }, [url, dispatch])

  const isUninitialized = status === 'idle'
  const isLoading = status === 'loading'
  const isError = status === 'failed'
  const isSuccess = status === 'succeeded'

  return { collection, isUninitialized, isLoading, isError, error, isSuccess, onSetUrl: setUrl }
}

export const useCharacterDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setCharacterDetail = (character: CharacterType) => {
    dispatch(setDetail(character));
    navigate(`/character/${character.id}`);
  };

  return { setCharacterDetail }
}