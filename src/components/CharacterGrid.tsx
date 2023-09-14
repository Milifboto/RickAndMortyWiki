import { useCharacterDetail } from './customHooks/useCharacter'
import { CharacterType } from '../types/character'

interface Props {
  characters: CharacterType[]
}

const CharacterGrid = ({ characters }: Props) => {
  const { setCharacterDetail } = useCharacterDetail()

  return (
    <div>
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <h3>
              {character.status} — {character.species}
            </h3>
            <img src={character.image} alt={`Photo of ${character.name}`} />
            <h3>First seen in: {character.firstSeenIn}</h3>
            <h3>Last known location: {character.lastKnownLocation}</h3>
            <button onClick={() => setCharacterDetail(character)}>
              View More
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default CharacterGrid
