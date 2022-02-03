export type Status = "Draft" | "Published"

export interface Service {
  id: string
  name: string
  description: string
  url: string
  email?: string
  address?: string[] // Airtable "physical_addresses" table ids
  phoneNumbers?: string[]
  taxonomyString?: string[]
}

export interface CreateServicesListRequest {
  name: string
  description: string
  Status: Status
  Services: string[] // Airtable "services" table idss
  creator: string
}

export interface ServicesList extends CreateServicesListRequest {
  id: string
  ServicesNames: string[]
  taxonomies?: string[]
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
  latitude?: string
  longitude?: string
}
