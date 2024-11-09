export interface IPilots {
  [index: number]: string
}

export interface IFilms {
  [index: number]: string
}

export interface IStarship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: IPilots
  films: IFilms
  created: string
  edited: string
  url: string
}

export interface IData {
  count: number
  next: string | null
  previous: string | null
  results: IStarship[]
}