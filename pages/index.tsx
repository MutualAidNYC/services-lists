import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Heading, HStack, Stack, Box, VStack, Text } from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from 'components'
import { useAllServicesLists, useTaxonomyFilter } from 'hooks'
import { ServicesList } from 'models'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'

export const HomePage: NextPage = () => {
  const { baseServicesLists, servicesLists, setServicesLists } =
    useAllServicesLists()

  const filterByTaxonomies = useCallback(
    (servicesList: ServicesList, filters: string[]) =>
      servicesList.taxonomies?.some((taxonomy) => filters.includes(taxonomy)) ??
      false,
    []
  )
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(
    baseServicesLists,
    setServicesLists,
    filterByTaxonomies
  )

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [displayAmount, setDisplayAmount] = useState([0, 9])

  useEffect(() => {
    if (servicesLists?.length < 70) {
      setDisplayAmount([0, servicesLists.length])
    }
  }, [])

  return (
    <Box w="100%" mb={8} display="flex" flexDirection="column">
      <VStack
        w="100%"
        mb={8}
        alignItems="left"
        pl={{ base: 4, sm: 16, md: 32 }}
      >
        <Heading fontSize={{ base: '4xl', sm: '5xl' }} mt={8}>
          Services Lists
        </Heading>
        <SearchBar
          baseData={baseServicesLists}
          setData={setServicesLists}
          searchFields={['name', 'description']}
          w={{ base: '100%', sm: '60%' }}
          mb="24px"
        />
        <HStack spacing="24px" w="100%" mb="24px" mt={2}>
          <SortMenu
            data={servicesLists}
            setData={setServicesLists}
            sortFieldsTextToVal={sortFieldsTextToVal}
          />

          <Box>
            <Select
              isMulti
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Filter By"
              options={taxonomyOptions}
              onChange={(e) => {
                setFilters(e.map((e) => e.value))
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 16,
                colors: {
                  ...theme.colors,
                  primary25: '#B2DFDB',
                  primary: 'black',
                },
              })}
            />
          </Box>
        </HStack>
      </VStack>
      <Stack spacing="36px" alignItems="left" pl={{ base: 4, sm: 16, md: 32 }}>
        {servicesLists?.map((servicesList, i) => (
          <Box
            key={i}
            display={
              i >= displayAmount[0] && i <= displayAmount[1]
                ? 'inherit'
                : 'none'
            }
          >
            <ServicesListItem
              pr={{ base: '2px', sm: '8px' }}
              w="100%"
              _hover={{
                base: {},
                md: { background: '#fafafa', borderRadius: '24px' },
              }}
              key={servicesList.name}
              servicesList={servicesList}
            />
          </Box>
        ))}
      </Stack>

      <VStack
        w="100%"
        mt={8}
        px={{ base: '4px', sm: '8px', md: '16px' }}
        spacing={0}
      >
        <Stack w="100%" justifyContent="space-between" direction="row">
          <Box />
          <Text fontWeight="bold">
            {' '}
            {displayAmount[1] + 1 - displayAmount[0] + '  results loaded.'}{' '}
          </Text>
          <Text fontSize="md" pr={{ base: '12px' }}>
            {' '}
            {displayAmount[0] + 1 + ' ... ' + (displayAmount[1] + 1)}{' '}
          </Text>
        </Stack>

        <HStack alignItems="left" justifyContent="right" w="100%">
          <ChevronLeftIcon
            w="32px"
            h="32px"
            _hover={{ width: '40px', height: '40px' }}
            onClick={() => {
              displayAmount[0] - 10 >= 0
                ? setDisplayAmount([
                    displayAmount[0] - 10,
                    displayAmount[1] - 10,
                  ])
                : null
            }}
          />

          <ChevronRightIcon
            w="32px"
            h="32px"
            _hover={{ width: '40px', height: '40px' }}
            onClick={() => {
              displayAmount[1] + 10 <= servicesLists?.length
                ? setDisplayAmount([
                    displayAmount[0] + 10,
                    displayAmount[1] + 10,
                  ])
                : null
            }}
          />
        </HStack>
      </VStack>
    </Box>
  )
}
