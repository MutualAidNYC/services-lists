export type ResourceListStatus = 'Draft' | 'Published'

export type ResourceStatus =
  | 'Needs Review'
  | 'Revisit'
  | 'Published'
  | 'Do Not Publish'

export const NO_ASSOCIATED_GROUP = '-No Associated Group'

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
  /** Resources should have only one need - array shape comes from Airtable mapping */
  needs?: string[]
  neighborhoodNames?: string[]
  'Created Time': string
  'Last Modified': string
  // Not all resources have addresses
} & Partial<Address>

export type Service = {
  id: string
  name: string
  status: ResourceStatus
  communityFocus?: string[]
  ResourceType?: string[]
  service_areas?: string[]
  description?: string
  languages?: string[]
  attributes?: string[]
  locations?: string[]
  url?: string
  phoneNumbers?: string
  email?: string
  Notes?: string
  organizations?: string[]
  'x-QualityController'?: string[]
  'x-Researchers'?: string[]
  'x-Contact'?: string 
  'x-address'?: any[]
  'x-Resources Lists'?: string[]
  'Combined Taxonomy Terms'?: any
  needFocus?: string[]
  neighborhoodNames?: string[]
  groupName?: any[]
  assured_date?: string
  assured_email?: string
  application_process?: string
  taxonomy_terms?: string[]
  last_modified: string
  alternative_name?: string
  minimum_age?: number
  maximum_age?: number
  interpretation_services?: string[]
  fees_description?: string
  accreditations?: string
  programs?: string[]
  schedules?: string[]
  contacts?: string[]
  eligibility_description?: string
  alert?: string
  license?: string
  Created: string
  service_locations?: string[]
  funding?: string[]
  cost_options?: string[]
  required_document?: string[]

} 

export const RESOURCE_SEARCH_FIELDS: (keyof Resource)[] = [
  'title',
  'groupName',
  'details',
]

export const RESOURCE_SORT_METHODS = [
  'name',
  'Created',
  'last_modified',
] as const

export type ResourceSortMethod = typeof RESOURCE_SORT_METHODS[number]

export type CreateServicesListRequest = {
  name: string
  description: string
  status: ResourceListStatus
  /** `Resources` table IDs */
  resources: string[]
  creator: string
  userId?: string
}

export type ServicesList = CreateServicesListRequest & {
  id: string
  ServicesNames: string[]
  taxonomies?: string[]
  createdTime: string
}
