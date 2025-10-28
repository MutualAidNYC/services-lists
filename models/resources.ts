export type ResourceListStatus = 'Draft' | 'Published'

export type ResourceStatus =
  | 'Needs Review'
  | 'Revisit'
  | 'Published'
  | 'Do Not Publish'

export const NO_ASSOCIATED_GROUP = '-No Associated Group'

export type Address = {
  'x-streetAddress': string
  'x-city': string
  'x-state': string
  'x-zip': string
  'y-latitude': number
  'y-longitude': number
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
  description?: string
  languages?: string[]
  url?: string
  phoneNumbers?: string
  email?: string
  organizations?: string[]
  'x-Resources Lists'?: string[]
  'x-address'?: any[]
  needFocus?: string[]
  groupName?: any[]
  assured_date?: string
  neighborhoodNames?: string[]
  last_modified: string
  Created: string
} & Partial<Address>

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
