export default interface ICitizen {
  _id?: string
  id: number
  name: string
  city_id: number
  groups: { [key: string]: string }
}
