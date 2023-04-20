import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getAllResources } from 'apiFunctions'
import {
  CreateListAlert,
  CreateListDrawer,
  Pagination,
  ResourceCard,
} from 'components'
import Fuse from 'fuse.js'
import { CreateListProvider, useCreateList, usePagination } from 'hooks'
import { Resource, RESOURCE_SEARCH_FIELDS } from 'models'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { Search } from 'react-feather'
import { useQuery } from 'react-query'
import { fuseSearch, onEnter } from 'utils'

export const HomePage: NextPage = () => {
  const { data: allResources } = useQuery<Resource[], Error>(
    ['allResources'],
    () => getAllResources()
  )

  const [filteredResources, setFilteredResources] = useState(allResources ?? [])
  // Update resources state when query finishes
  useEffect(() => {
    if (allResources) {
      setFilteredResources(allResources)
    }
  }, [allResources])

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

  const fuse = useMemo(() => {
    return new Fuse(allResources ?? [], { keys: RESOURCE_SEARCH_FIELDS })
  }, [allResources])
  // For keyword searches
  const [keyword, setKeyword] = useState('')

  const filterResources = () => {
    // Return all resources if keyword is an empty string
    const keywordSearchResources = keyword
      ? fuseSearch({ fuse, pattern: keyword })
      : allResources ?? []

    setFilteredResources(keywordSearchResources)
  }

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
        <title>{'Create A List'}</title>
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
      <Box px="112px" py="96px">
        <Text fontWeight="semibold" color="Primary.600" mb="12px">
          Community Resources
        </Text>
        <Heading as="h1" fontSize="5xl" mb="24px">
          Resource Hub
        </Heading>
        <Text maxW="50%">
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
        px="112px"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: undefined, md: 'center' }}
        spacing="16px"
        justify="space-between"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search />
          </InputLeftElement>
          <Input
            value={keyword}
            placeholder="Search by keyword"
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => onEnter({ event, handler: filterResources })}
          />
        </InputGroup>
        <Button onClick={filterResources}>Search</Button>
      </Stack>
      <Stack spacing="32px" px="112px" py="64px">
        <Stack spacing="16px">
          <Button onClick={onDrawerOpen}>View your list</Button>
        </Stack>
        <Grid templateColumns="repeat(3, 1fr)" gap="32px" py="32px">
          {filteredResources
            .slice((page - 1) * pageSize, page * pageSize)
            .map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                saveResource={() => saveResource(resource)}
              />
            ))}
        </Grid>
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
      <Center bgColor="Gray.50" flexDirection="column" py="96px">
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
