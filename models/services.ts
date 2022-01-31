export interface Service {
  id: string
  name: string
  description: string
  url: string
  email?: string
  address?: string[] // list of IDs linking to locations table
  phoneNumbers?: string[]
  taxonomyString?: string[]
}

export interface ServicesList {
  id: string
  name: string
  description: string
  Services: string[] // list of IDs linking to services table
  ServicesNames: string[]
  taxonomies?: string[]
  creator: string
  createdAt: string
}

export interface TaxonomyTerm {
  term: string
}

export interface Address {
  id: string
  address_1: string
  city: string
  state_province: string
  postal_code: string
  latitude: string
  longitude: string
}
