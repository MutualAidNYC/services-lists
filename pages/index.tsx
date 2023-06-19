import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import {
  getAllNeeds,
  getAllResources,
  selectAllNeighborhoods,
} from 'apiFunctions'
import {
  CreateListAlert,
  CreateListDrawer,
  Pagination,
  ResourceCard,
} from 'components'
import Fuse from 'fuse.js'
import { CreateListProvider, useCreateList, usePagination } from 'hooks'
import {
  RESOURCE_SEARCH_FIELDS,
  RESOURCE_SORT_METHODS,
  Resource,
  ResourceSortMethod,
} from 'models'
import { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { ChevronsDown, ChevronsUp, Search } from 'react-feather'
import Select from 'react-select'
import { fuseSearch } from 'utils'

export const HomePage: NextPage = () => {
  const { data: allResources } = useQuery(['getAllResources'], () =>
    getAllResources()
  )

  const { data: allNeeds } = useQuery(['getAllNeeds'], () => getAllNeeds())
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])

  const { data: allNeighborhoods } = useQuery(['selectAllNeighborhoods'], () =>
    selectAllNeighborhoods()
  )
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    []
  )
  const [resourceSortLabel, setResourceSortLabel] =
    useState<string>('Sort Ascending')

  const [resourceSortMethod, setResourceSortMethod] =
    useState<ResourceSortMethod>('Last Modified')
  const [resourceSortAscending, setResourceSortAscending] =
    useState<boolean>(false)
  const changeResourceSortOrder = () => {
    setResourceSortLabel(
      resourceSortAscending ? 'Sort Ascending' : 'Sort Descending'
    )
    setResourceSortAscending(!resourceSortAscending)
  }

  const fuse = useMemo(() => {
    return new Fuse(allResources ?? [], { keys: RESOURCE_SEARCH_FIELDS })
  }, [allResources])
  // For keyword searches
  const [keyword, setKeyword] = useState('')

  const filteredResources = useMemo(() => {
    // Return all resources if keyword is an empty string
    let filteredResources = keyword
      ? fuseSearch({ fuse, pattern: keyword })
      : allResources ?? []

    if (selectedNeeds.length > 0) {
      filteredResources = filteredResources.filter(
        (resource) =>
          resource.needs && selectedNeeds?.includes(resource.needs[0])
      )
    }

    if (selectedNeighborhoods.length > 0) {
      filteredResources = filteredResources.filter(
        (resource) =>
          resource.neighborhoodNames &&
          resource.neighborhoodNames.filter((neighborhood) =>
            selectedNeighborhoods.includes(neighborhood)
          ).length >= 1
      )
    }

    filteredResources = filteredResources.sort(function (a, b) {
      const aVal = a[resourceSortMethod]
        .toLowerCase()
        .replace(/[^0-9a-z]/gi, '')
      const bVal = b[resourceSortMethod]
        .toLowerCase()
        .replace(/[^0-9a-z]/gi, '')
      if (resourceSortAscending) {
        return bVal <= aVal ? 1 : -1
      } else {
        return aVal <= bVal ? 1 : -1
      }
    })

    return filteredResources
  }, [
    allResources,
    fuse,
    keyword,
    resourceSortAscending,
    resourceSortMethod,
    selectedNeeds,
    selectedNeighborhoods,
  ])

  const {
    page,
    setPage,
    pageSize,
    range,
    hasPrevious,
    hasNext,
    previous,
    next,
  } = usePagination({
    totalItems: filteredResources.length,
    initialPageSize: 6,
    pagesDisplayed: 10,
  })

  const createListHandler = useCreateList()
  const { onAlertOpen, onDrawerOpen } = createListHandler

  const [selectedResource, setSelectedResource] = useState<Resource>()
  const saveResource = (resource: Resource) => {
    setSelectedResource(resource)
    onAlertOpen()
  }

  return (
    <>
      <Head>
        <title>Resource Hub - Mutual Aid NYC</title>
        <meta
          name="description"
          content={'Create a customized list of resources that you can share.'}
        />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <CreateListProvider value={createListHandler}>
        <CreateListAlert selectedService={selectedResource} />
        <CreateListDrawer />
      </CreateListProvider>
      <Box px="10%" py="96px" minWidth="800px">
        <Text fontWeight="semibold" color="Primary.600" mb="12px">
          Community Resources
        </Text>
        <Heading as="h1" fontSize="5xl" mb="24px">
          Resource Hub
        </Heading>
        <Text maxW="800px">
          Our community-sourced, volunteer-curated library is a growing
          collection of the many resources available to New Yorkers. Mutual Aid
          NYC is committed to building a comprehensive list of high-quality
          resources—check back frequently, as new resources are added every day!
          <br /> <br />
          If you can’t find what you need, search the map and borough-specific
          lists in the Groups Directory to find groups that can help.
        </Text>
      </Box>
      <Stack
        bgColor="Primary.50"
        py="72px"
        px="10%"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: undefined, md: 'center' }}
        spacing="16px"
        justify="space-between"
        minWidth="800px"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            value={keyword}
            placeholder="Search by keyword"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </InputGroup>
      </Stack>
      <Stack spacing="32px" px="10%" py="64px" minWidth="800px">
        <Button onClick={onDrawerOpen}>View your list</Button>
        <Flex w="100%">
          <Flex w="50%">
            <Box w="50%" pr="20px" minWidth="250px">
              <Select
                isMulti
                isSearchable
                options={allNeeds?.map((need) => ({
                  value: need.Need,
                  label: need.Need,
                }))}
                onChange={(values) =>
                  setSelectedNeeds(values.map((value) => value.value))
                }
                placeholder="Filter by need"
              />
            </Box>
            <Box w="50%" minWidth="250px">
              <Select
                isMulti
                isSearchable
                options={allNeighborhoods
                  ?.map((neighborhood) => ({
                    value: neighborhood['Neighborhood Name'],
                    label: neighborhood['Neighborhood Name'],
                  }))
                  .sort(function (a, b) {
                    return a.label.localeCompare(b.label)
                  })}
                onChange={(values) =>
                  setSelectedNeighborhoods(values.map((value) => value.value))
                }
                placeholder="Filter by neighborhood"
              />
            </Box>
          </Flex>
          <Flex w="50%">
            <Spacer />
            <Box w="30%" minWidth="200px">
              <Flex>
                <Spacer />
                <IconButton
                  aria-label="sort"
                  size="sg"
                  variant="outline"
                  icon={
                    resourceSortAscending ? <ChevronsUp /> : <ChevronsDown />
                  }
                  onClick={changeResourceSortOrder}
                  title={resourceSortLabel}
                />
                <Box w="80%">
                  <Select
                    isSearchable={false}
                    options={RESOURCE_SORT_METHODS.map((method) => ({
                      value: method,
                      label: method,
                    }))}
                    onChange={(value) =>
                      value ? setResourceSortMethod(value.value) : null
                    }
                    placeholder="Sort by"
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <SimpleGrid minChildWidth="600px" gap="32px" py="32px">
          {filteredResources
            .slice((page - 1) * pageSize, page * pageSize)
            .map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                saveResource={() => saveResource(resource)}
              />
            ))}
        </SimpleGrid>
        <Pagination
          page={page}
          setPage={setPage}
          range={range}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          previous={previous}
          next={next}
        />
      </Stack>
      <Center
        bgColor="Gray.50"
        flexDirection="column"
        py="96px"
        minWidth="800px"
      >
        <Heading pb="20px">Contribute to the Resource Hub</Heading>
        <Text pb="40px" textAlign="center">
          If you know of resources that aren’t included in our database, please
          submit it to MANYC.
        </Text>
        <Button
          isExternal
          as={Link}
          href="https://mutualaid.nyc/submit-a-resource/"
        >
          Submit a resource
        </Button>
      </Center>
    </>
  )
}

export default HomePage
