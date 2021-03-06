import { ArrowDownIcon, PlusSquareIcon } from '@chakra-ui/icons'
import {
  Heading,
  Center,
  HStack,
  Text,
  VStack,
  LinkBox,
  LinkOverlay,
  Box,
  Stack,
  Button,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { Map, SearchBar, ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'
import { Address, Service } from '../../models'
import { PaginatedList } from 'react-paginated-list'
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from 'react-select'
import { Spinner } from '@chakra-ui/react'

export const ListPage: NextPage = () => {
  const router = useRouter()

  const serviceListHandler = useServiceList(router.query.listId as string)

  const {
    isLoading,
    listName,
    visibleServices,
    numServices,
    setSearchQuery,
    addressIdToServiceName,
    addresses,
    defaultMapCenter,
  } = serviceListHandler

  const mapElement = useRef<HTMLDivElement>(null)

  const scrollToMap = () => {
    mapElement.current?.scrollIntoView()
  }

  const [maxAmountDisplayed, setMaxAmountDisplayed] = useState(5)

  const displayAmountOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: numServices, label: 'All' },
  ]

  const filterStyles: StylesConfig<
    {
      label: string
      value: string
    },
    true,
    GroupBase<{
      label: string
      value: string
    }>
  > = {
    option: (provided: CSSObjectWithLabel) => ({
      ...provided,
      minHeight: 36,
    }),
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: '180px',
      borderRadius: '28px',
    }),
    singleValue: (provided: CSSObjectWithLabel) => {
      return { ...provided }
    },
  }
  const pageViewStyles: StylesConfig<
    {
      value: number
      label: string
    },
    false,
    GroupBase<{
      value: number
      label: string
    }>
  > = {
    option: (provided: CSSObjectWithLabel) => ({
      ...provided,
      minHeight: 36,
    }),
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: '90px',
      borderRadius: '28px',
    }),
    singleValue: (provided: CSSObjectWithLabel) => {
      return { ...provided }
    },
  }

  const [selectedAddress, setSelectedAddress] = useState<Address>()
  const [taxonomyFilters, setTaxonomyFilters] = useState<string[]>([])

  function getAddress(service: Service): Address | undefined {
    let res = undefined
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i]
      if (service.address !== undefined && address.id === service.address[0]) {
        res = address
        break
      }
    }
    return res
  }

  const getAllUniqueTaxonomies = (): string[] => {
    const taxonomies: string[] = []
    for (let i = 0; i < visibleServices.length; i++) {
      const serviceTaxonomies = visibleServices[i].taxonomyString
      if (serviceTaxonomies) {
        for (let n = 0; n < serviceTaxonomies.length; n++) {
          if (!taxonomies.includes(serviceTaxonomies[n])) {
            taxonomies.push(serviceTaxonomies[n])
          }
        }
      }
    }
    return taxonomies
  }

  const getFilteredList = (list: Service[]): Service[] => {
    if (taxonomyFilters.length > 0) {
      const filteredList: Service[] = []
      for (let i = 0; i < list.length; i++) {
        const taxonomies = list[i].taxonomyString
        if (taxonomies) {
          for (let n = 0; n < taxonomyFilters.length; n++) {
            if (taxonomies.includes(taxonomyFilters[n])) {
              filteredList.push(list[i])
              break
            }
          }
        }
      }
      return filteredList
    }
    return list
  }

  const getFilteredAddressList = (list: Service[]): Address[] => {
    if (taxonomyFilters.length > 0) {
      const addressArr: Address[] = []
      for (let i = 0; i < list.length; i++) {
        const address = getAddress(list[i])
        if (address) {
          addressArr.push(address)
        }
      }
      return addressArr
    } else {
      return addresses ? addresses : []
    }
  }

  return (
    <VStack
      w="100%"
      minH="calc(100vh - 96px)"
      h="100%"
      spacing={0}
      px={{ base: 2, md: 24 }}
    >
      <Head>
        <title>{listName}</title>
        <meta name="description" content={listName} />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <ServiceListProvider value={serviceListHandler}>
        <Stack w="100%" height="100%">
          <Stack
            pt={16}
            pb={8}
            w="100%"
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
          >
            <Heading size="2xl" textAlign="center">
              {listName}
            </Heading>
            <LinkBox display="flex" justifyContent="center">
              <LinkOverlay
                href="/create-list"
                _hover={{ textDecoration: 'underline' }}
              >
                <Button colorScheme="teal">
                  {' '}
                  Create a new List <PlusSquareIcon mx={1} />{' '}
                </Button>
              </LinkOverlay>
            </LinkBox>
          </Stack>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'inherit', md: 'none' }}
            w={{ base: '100%', md: '55%' }}
            justifyContent="center"
            spacing={4}
          >
            <SearchBar
              handleSearch={setSearchQuery}
              w={{ base: '100%', sm: '60%' }}
            />
            <HStack>
              {!isLoading && (
                <Select
                  isMulti
                  isSearchable
                  placeholder="Filter By"
                  closeMenuOnSelect={true}
                  options={getAllUniqueTaxonomies().map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  onChange={(e) => {
                    setTaxonomyFilters(e.map((e) => e.value))
                  }}
                  styles={filterStyles}
                />
              )}

              <Select
                isSearchable
                closeMenuOnSelect={true}
                placeholder={`${maxAmountDisplayed}`}
                options={displayAmountOptions}
                onChange={(e) => {
                  e ? setMaxAmountDisplayed(e.value) : null
                }}
                styles={pageViewStyles}
              />

              <ArrowDownIcon
                alignItems={'left'}
                ml={'16px'}
                onClick={() => scrollToMap()}
              />
            </HStack>
          </Stack>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            w="100%"
            minH="calc(100vh - 96px)"
            h="100%"
            justifyContent="space-between"
            position="relative"
          >
            <Box w={{ base: '100%', md: '55%' }}>
              <SearchBar
                handleSearch={setSearchQuery}
                w="100%"
                display={{ base: 'none', md: 'inherit' }}
                px={'2'}
              />
              <PaginatedList
                list={visibleServices}
                useMinimalControls={true}
                itemsPerPage={maxAmountDisplayed}
                renderList={(list: Service[]) => {
                  return (
                    <VStack
                      px={2}
                      maxHeight="calc(100vh - 200px)"
                      overflowY="scroll"
                      overflowX="hidden"
                      css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: 'grey',
                          borderRadius: '24px',
                        },
                      }}
                    >
                      <>
                        {!isLoading &&
                          list.map((item: Service) => {
                            return (
                              <Box w="100%" cursor="pointer" key={item.id}>
                                <ServiceItem
                                  service={item}
                                  selectedAddress={selectedAddress}
                                  setSelectedAddress={setSelectedAddress}
                                  getAddress={getAddress}
                                />
                              </Box>
                            )
                          })}
                        {isLoading && (
                          <Spinner
                            mt={16}
                            mb={8}
                            boxSize="75px"
                            color="teal"
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                          />
                        )}
                        <Box pb={8}> {/* Just for styling purposes */} </Box>
                      </>
                    </VStack>
                  )
                }}
              />
              <Text textAlign="center" fontWeight="light">
                {' '}
                {` Showing ${
                  maxAmountDisplayed > visibleServices.length
                    ? visibleServices.length
                    : maxAmountDisplayed
                } out of ${visibleServices.length} results.`}{' '}
              </Text>
            </Box>

            <VStack w={{ base: '100%', md: '44%' }} height="100%">
              <HStack
                w="100%"
                justifyContent="left"
                display={{ base: 'none', md: 'inherit' }}
              >
                {!isLoading && (
                  <Select
                    isMulti
                    isSearchable
                    placeholder="Filter By"
                    closeMenuOnSelect={true}
                    options={getAllUniqueTaxonomies().map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    onChange={(e) => {
                      setTaxonomyFilters(e.map((e) => e.value))
                    }}
                    styles={filterStyles}
                  />
                )}

                <Select
                  isSearchable
                  closeMenuOnSelect={true}
                  placeholder={`${maxAmountDisplayed}`}
                  options={displayAmountOptions}
                  onChange={(e) => {
                    e ? setMaxAmountDisplayed(e.value) : null
                  }}
                  styles={pageViewStyles}
                />
              </HStack>
              <Center
                w="100%"
                height="100%"
                borderRadius={36}
                overflow="hidden"
                ref={mapElement}
              >
                <Map
                  defaultCenter={defaultMapCenter}
                  addressIdToLabel={addressIdToServiceName}
                  addresses={getFilteredAddressList(
                    getFilteredList(visibleServices)
                  )}
                  selectedAddress={selectedAddress}
                  width={`${
                    typeof window != 'undefined'
                      ? window.screen.width * 45
                      : 300
                  }px`}
                  height={`${
                    typeof window != 'undefined'
                      ? window.screen.height * 0.55
                      : 350
                  }px`}
                />
              </Center>
            </VStack>
          </Stack>
        </Stack>
      </ServiceListProvider>
    </VStack>
  )
}

export default ListPage
