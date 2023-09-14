import CharacterGrid from '../components/CharacterGrid'
import Paging from '../components/Paging'
import { useGetCharacterCollection } from '../components/customHooks/useCharacter'

const Home = () => {
  const { collection, isLoading, isError, onSetUrl } = useGetCharacterCollection()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Algo salió mal...</div>
  }
  return (
    <div>
      <Paging onSetUrl={onSetUrl} />
      <CharacterGrid characters={collection} />
      <Paging onSetUrl={onSetUrl} />
    </div>
  )
}

export default Home
