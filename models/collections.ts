type CollectionStatus = 'Draft' | 'Published'

export type Collection = {
  id: string
  status: CollectionStatus
  name: string
  description: string
  creator: string
  resources: string[]
  createdAt: string
}
