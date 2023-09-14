import { useGetCharacterCollection } from './customHooks/useCharacter'

const CharacterGrid = () => {
  const { collection, isLoading, isError } = useGetCharacterCollection()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Algo salió mal</div>
  }

  return (
    <div>
      {collection.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <h3>
              {character.status} — {character.species}
            </h3>
            <img src={character.image} alt={`Photo of ${character.name}`} />
            <h3>Last known location: {character.lastKnownLocation}</h3>
            <h3>First seen in: {character.firstSeenIn}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default CharacterGrid
