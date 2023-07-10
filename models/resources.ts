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

export const RESOURCE_SEARCH_FIELDS: (keyof Resource)[] = [
  'title',
  'groupName',
  'details',
]

export type CreateServicesListRequest = {
  name: string
  description: string
  status: ResourceListStatus
  /** `Resources` table IDs */
  resources: string[]
  creator: string
}

export type ServicesList = CreateServicesListRequest & {
  id: string
  ServicesNames: string[]
  taxonomies?: string[]
  createdAt: string
}

export const RESOURCE_SORT_METHODS = [
  'Last Modified',
  'Created Time',
  'title',
] as const

export type ResourceSortMethod = typeof RESOURCE_SORT_METHODS[number]
