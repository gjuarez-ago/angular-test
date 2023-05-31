export interface User {
  id: string
  nombre: string
  password: string
  idRol: number
  numberPhone: string
  email: string
  company: string
  active: boolean
  userStatus: number
  lastUpdate: any
  attempts: number
  canDeleteDevices: boolean
  token: string
  expireToken: number
  lastLoginDate: any
  authorities: string[]
  ndevicesForAgoMovil: number
  amaterno: string
  apaterno: string
  notLocked: boolean
  role: any
}
