import { ObjectIndices } from '.';

export interface Service {
  id: string
  name: string
  description: string
  address?: string[] // list of IDs linking to locations table
  url: string
  email?: string
  phoneNumbers?: string[]
}

export interface ServicesList extends ObjectIndices {
  id: string
  name: string
  description: string
  Services: string[] // list of IDs linking to services table
  ServicesNames: string[]
  taxonomies: string[]
  Status: string
  Owner: string[] // list of IDs linking to organizations table
  Author: string
  Created: string
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
