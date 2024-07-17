export interface TripUrl {
  id?: string
  title: string
  url: string
}

export interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export interface localUserProps {
  id: string
  email: string
}
