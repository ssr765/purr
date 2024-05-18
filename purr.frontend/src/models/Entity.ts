export interface Entity {
  id: number
  logo: string
  name: string
  address: string
  coords: {
    lat: number
    lng: number
  }
  type: 'cafe' | 'heal' | 'shop' | 'protec'
  webpage: string
  phone: string
}
