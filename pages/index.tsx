import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  CreateListAlert,
  CreateListDrawer,
  PaginationSection,
  ResourceCard,
  SearchBar,
  SortMenu,
} from 'components'
import {
  CreateListProvider,
  PaginationProvider,
  SortProvider,
  useCreateList,
} from 'hooks'
import { Resource } from 'models'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Select from 'react-select'

export const HomePage: NextPage = () => {
  const createListHandler = useCreateList()
  const {
    visibleServices,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    paginationHandler,
    sortHandler,
    onAlertOpen,
    onDrawerOpen,
  } = createListHandler

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

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
        <SearchBar
          handleSearch={setSearchQuery}
          placeholder={'Search keywords'}
          w={{ base: '100%', md: '33%' }}
        />
        <Button>Search</Button>
      </Stack>
      <Stack spacing="32px" px="112px" py="64px">
        <Stack spacing="16px">
          <PaginationProvider value={paginationHandler}>
            <PaginationSection />
          </PaginationProvider>
          <HStack spacing="16px">
            <SortProvider value={sortHandler}>
              <SortMenu sortFieldsTextToVal={sortFieldsTextToVal} />
            </SortProvider>
            <Select
              isMulti
              isSearchable
              instanceId="taxonomySelect"
              closeMenuOnSelect={false}
              options={taxonomyOptions}
              placeholder="Filter by resource category"
              onChange={(e) => setTaxonomyFilters(e.map((e) => e.value))}
            />
          </HStack>
          <Button onClick={onDrawerOpen}>View your list</Button>
        </Stack>
        <Grid templateColumns="repeat(3, 1fr)" gap="32px" py="32px">
          {visibleServices.map((service) => (
            <ResourceCard
              key={service.id}
              resource={service}
              saveResource={() => saveResource(service)}
            />
          ))}
        </Grid>
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
