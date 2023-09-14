import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setPaging } from './pagingSlice'
import axios from 'axios'

import type { RootState } from '../store'
import type { CharacterType, RawCharacter } from '../../types/character'
import type { Episode } from '../../types/episode'

export interface InfoResponse {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface DataResponse {
  info: InfoResponse
  results: RawCharacter[]
}

export const fetchCharacterCollection = createAsyncThunk(
  'character/fetchCharacterCollection',
  async (url: string | null, thunkAPI) => {
    const endpoint = url ?? `${import.meta.env.VITE_API_BASE_URL}/character`
    const { data }: { data: DataResponse } = await axios.get(endpoint)

    thunkAPI.dispatch(setPaging(data.info))

    const transformedCharacterList: CharacterType[] = await Promise.all(
      data.results.map(async (character: RawCharacter) => {
        const { data }: { data: Episode } = await axios.get(
          character.episode[0]
        )
        /* eslint-disable */
        const { origin, location, episode, url, created, ...restOfCharacter } =
          character
        /* eslint-enable */
        return {
          ...restOfCharacter,
          lastKnownLocation: character.location.name,
          firstSeenIn: data.name,
        }
      })
    )

    return transformedCharacterList
  }
)

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
type ErrorStatus = string | undefined | null

interface CharacterState {
  collection: CharacterType[]
  collectionStatus: LoadingStatus
  collectionError: ErrorStatus
  detail: CharacterType
  detailStatus: LoadingStatus
  detailError: ErrorStatus
}

const initialState: CharacterState = {
  collection: [],
  collectionStatus: 'idle',
  collectionError: null,
  detail: {} as CharacterType,
  detailStatus: 'idle',
  detailError: null,
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterCollection.pending, (state) => {
        state.collectionStatus = 'loading'
      })
      .addCase(fetchCharacterCollection.fulfilled, (state, action) => {
        state.collectionStatus = 'succeeded'
        state.collection = action.payload
      })
      .addCase(fetchCharacterCollection.rejected, (state, action) => {
        state.collectionStatus = 'failed'
        state.collectionError = action.error.message
      })
  },
})

export const selectCharacterCollection = (state: RootState) =>
  state.character.collection
export const selectCollectionStatus = (state: RootState) =>
  state.character.collectionStatus
export const selectCollectionError = (state: RootState) =>
  state.character.collectionError
export const selectCharacterDetail = (state: RootState) =>
  state.character.detail
export const selectDetailStatus = (state: RootState) =>
  state.character.detailStatus
export const selectDetailError = (state: RootState) =>
  state.character.detailError

export const { setDetail } = characterSlice.actions
export default characterSlice.reducer
