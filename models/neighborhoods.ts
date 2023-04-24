export type Neighborhood = {
  'Neighborhood Name': string
  'NTA Name': string
  BoroName: string
  CountyFIPS: string
  NTACode: string
  State: string
  Address: string
  GeoCode: string
  /** List of group IDs */
  'Neighborhood Groups Providing Service is In'?: string[]
  /** List of resource IDs */
  Resources?: string[]
  'Groups copy'?: string
}
