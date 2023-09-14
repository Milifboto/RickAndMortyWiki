export interface RawCharacter {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'Unknown' | 'Post-Apocalyptic'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'Unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Character extends RawCharacter {
  lastKnownLocation: string
  firstSeenIn: string
}

export type CharacterType = Omit<
  Character,
  'origin' | 'location' | 'episode' | 'url' | 'created'
>
