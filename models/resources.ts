// TODO: Coordinate with research team to get rid of unnecessary fields 
export interface Service {
  name: string
  organizations: string[] // array of IDs linking to organizations table
  locations: string[] // list of IDs linking to locations table
  alternativeName: string
  description: string
  url: string
  email: string
  status: string
  applicationProcess: string
  waitTime: string
  fees: string
  accreditations: string[]
  licenses: string[]
  phones: string[] // list of IDs linking to phones table
  schedule: string[] // list of IDs linking to schedules table
  contacts: string[] // list of IDs linking to locations table
  id: number | string
  interpretationServices: string[]
  address: string[] // 
  xStatus: string
  xAIRSTaxonomy: string[]
  programs: string[] // list of IDs linking to programs table
  yNeighborhoods: string[] // list of IDs linking to Neighborhoods table
  yFacebook: string
  yInstagram: string
  yTwitter: string
  Communities: string[]
}
