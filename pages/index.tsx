import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  Stack,
  Text,
  useBoolean,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getAllNeeds, getAllCommunities, getAllResources } from 'apiFunctions'
import { CreateCollectionModal, Pagination, ResourceCard } from 'components'
import Fuse from 'fuse.js'
import { useCreateCollection, usePagination } from 'hooks'
import {
  ResourceSortMethod,
  RESOURCE_SEARCH_FIELDS,
  RESOURCE_SORT_METHODS,
} from 'models'
import { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { ChevronsDown, ChevronsUp, Search } from 'react-feather'
import Select from 'react-select'
import { fuseSearch } from 'utils'

export const HomePage: NextPage = () => {
  const { data: allResources } = useQuery(['getAllResources'], () =>
    getAllResources("NOT({status} = 'Do Not Publish')")
  )

  const { data: allNeeds } = useQuery(['getAllNeeds'], () => getAllNeeds())
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])

  const { data: allCommunities } = useQuery(['getAllCommunities'], () =>
    getAllCommunities("taxonomy = 'MANYC Community Focus'")
  )
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(
    []
  )

  const fuse = useMemo(() => {
    return new Fuse(allResources ?? [], { keys: RESOURCE_SEARCH_FIELDS })
  }, [allResources])
  // For keyword searches
  const [keyword, setKeyword] = useState('')

  const [resourceSortMethod, setResourceSortMethod] = useState<
    ResourceSortMethod | undefined
  >()
  const [resourceSortAscending, setResourceSortAscending] = useBoolean(true)

  const filteredResources = useMemo(() => {
    // Return all resources if keyword is an empty string
    let filteredResources = keyword
      ? fuseSearch({ fuse, pattern: keyword })
      : allResources ?? []

    if (selectedNeeds.length > 0) {
      filteredResources = filteredResources.filter(
        (service) =>
          service.needFocus && selectedNeeds?.includes(service.needFocus[0])
      )
    }

    if (selectedCommunities.length > 0) {
      filteredResources = filteredResources.filter(
        (service) =>
          service.communityFocus &&
          service.communityFocus.some((focus) =>
            selectedCommunities.includes(focus)
          )
      )
    }

    if (resourceSortMethod !== undefined) {
      filteredResources = filteredResources.sort((a, b) =>
        resourceSortAscending
          ? a[resourceSortMethod].localeCompare(b[resourceSortMethod])
          : b[resourceSortMethod].localeCompare(a[resourceSortMethod])
      )
    }

    return filteredResources
  }, [
    allResources,
    fuse,
    keyword,
    resourceSortAscending,
    resourceSortMethod,
    selectedNeeds,
    selectedCommunities,
  ])

  const numPages = useBreakpointValue({ base: 5, md: 10 })

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
    pagesDisplayed: numPages === undefined ? 10 : numPages,
  })

  const { onModalOpen, saveResource, ...createCollectionModalProps } =
    useCreateCollection()

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
      <Box px={{ base: '10%', lg: '112px' }}>
        <Text fontWeight="semibold" color="Primary.600" mb="12px">
          Community Resources
        </Text>
        <Heading as="h1" fontSize="5xl" mb="24px">
          Resource Hub
        </Heading>
        <Text maxW={{ base: '100%', lg: '50%' }}>
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
        px={{ base: '10%', lg: '112px' }}
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
          />
        </InputGroup>
      </Stack>
      <Stack spacing="32px" px={{ base: '10%', lg: '112px' }} py="64px">
        <Stack w="100%" direction={{ base: 'column', lg: 'row' }}>
          <Stack w="100%" direction={{ base: 'column', lg: 'row' }}>
            <Stack
              w={{ base: '100%', lg: '50%' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box
                w={{ base: '100%', lg: '50%' }}
                pr={{ base: '0px', lg: '20px' }}
              >
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
              <Box w={{ base: '100%', lg: '50%' }}>
                <Select
                  isMulti
                  isSearchable
                  options={allCommunities
                    ?.map((community) => ({
                      value: community['name'],
                      label: community['name'],
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))
                  }
                  onChange={(values) =>
                    setSelectedCommunities(values.map((value) => value.value))
                  }
                  placeholder="Filter by community"
                />
              </Box>
            </Stack>
            <Stack
              w={{ base: '100%', lg: '50%' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Spacer />
              <Box w={{ base: '100%', lg: '30%' }}>
                <Flex>
                  <Spacer />
                  <IconButton
                    aria-label="sort"
                    size="sg"
                    variant="outline"
                    icon={
                      resourceSortAscending ? <ChevronsUp /> : <ChevronsDown />
                    }
                    onClick={setResourceSortAscending.toggle}
                  />
                  <Box w={{ base: '100%', lg: '80%' }}>
                    <Select
                      isClearable
                      isSearchable={false}
                      options={RESOURCE_SORT_METHODS.map((method) => ({
                        value: method,
                        label: method,
                      }))}
                      onChange={(newValue) =>
                        setResourceSortMethod(newValue?.value)
                      }
                      placeholder="Sort by"
                    />
                  </Box>
                </Flex>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        {createCollectionModalProps.collectionResources.length > 0 && (
          <Button onClick={onModalOpen}>View your collection</Button>
        )}
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap="32px"
          py="32px"
        >
          {filteredResources
            .slice((page - 1) * pageSize, page * pageSize)
            .map((resource) => (
              <ResourceCard
                key={resource.id}
                service={resource}
                saveResource={() => saveResource(resource)}
              />
            ))}
        </Grid>
        <CreateCollectionModal {...createCollectionModalProps} />
      </Stack>
      <Pagination
        page={page}
        setPage={setPage}
        range={range}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        previous={previous}
        next={next}
      />
      <Center bgColor="Gray.50" flexDirection="column" py="96px">
        <Heading pb="20px" textAlign="center">
          Contribute to the Resource Hub
        </Heading>
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
