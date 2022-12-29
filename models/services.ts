export type ResourceListStatus = 'Draft' | 'Published'

export type ResourceStatus =
  | 'Needs Review'
  | 'Revisit'
  | 'Published'
  | 'Do Not Publish'

export type Address = {
  streetAddress: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
}

export type Resource = {
  id: string
  title: string
  status: ResourceStatus
  groupName?: string
  details: string
  link?: string
  phone?: string
  email?: string
  /** Comma-separated string of needs */
  Needs?: string
  // Not all resources have addresses
} & Partial<Address>

export type CreateServicesListRequest = {
  name: string
  description: string
  Status: ResourceListStatus
  Services: string[] // Airtable "services" table ids
  creator: string
}

export type ServicesList = CreateServicesListRequest & {
  id: string
  ServicesNames: string[]
  taxonomies?: string[]
  createdAt: string
}
