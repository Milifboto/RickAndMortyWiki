import { useAppSelector } from '../store/storeHooks'
import { selectCharacterDetail } from '../store/slice/characterSlice'

const CharacterDetail = () => {
  const character = useAppSelector(selectCharacterDetail)

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={`Photo of ${character.name}`} />
      <h3>Status: {character.status}</h3>
      <h3>Gender: {character.gender}</h3>
      <h3>{character.type && `Type: ${character.type}`}</h3>
      <h3>First seen in: {character.firstSeenIn}</h3>
      <h3>Last known location: {character.lastKnownLocation}</h3>
    </div>
  )
}

export default CharacterDetail
