import { PlusSquareIcon } from '@chakra-ui/icons'
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
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Map, SearchBar, ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'
import { Address, Service } from '../../models'
import { PaginatedList } from 'react-paginated-list'
import Select from 'react-select'

// Import Swiper styles & required modules
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper'

export const ListPage: NextPage = () => {
  const router = useRouter()

  const serviceListHandler = useServiceList(router.query.listId as string)

  const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  const [selectFilterValues, setSelectFilterValues] = useState<Service[]>([])

  const {
    isLoading,
    listName,
    baseServices,
    services,
    setServices,
    addressIdToServiceName,
    addresses,
    defaultMapCenter,
  } = serviceListHandler

  const [maxAmountDisplayed, setMaxAmountDisplayed] = useState(5)

  const displayAmountOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: services.length, label: 'All' },
  ]

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

  useEffect(() => {
    clearFilter()
  }, [])

  const clearFilter = () => {
    const updatedFilter: Address[] = []
    for (let i = 0; i < filteredServices.length; i++) {
      const temp = getAddress(filteredServices[i])
      if (temp) {
        updatedFilter.push(temp)
      }
    }
    setFilteredAddresses(updatedFilter)
    setSelectFilterValues([])
  }

  const updateFilters = (serviceToAdd: Service) => {
    let exists = false
    for (let i = 0; i < filteredServices.length; i++) {
      if (filteredServices[i].id === serviceToAdd.id) {
        exists = true
        break
      }
    }
    if (!exists) {
      setFilteredServices([...filteredServices, serviceToAdd])
      setSelectFilterValues([...selectFilterValues, serviceToAdd])
    }
  }

  const removeFilter = (serviceToRemove: Service) => {
    setFilteredServices(
      filteredServices.filter((service) => service.id !== serviceToRemove.id)
    )
    setSelectFilterValues(
      selectFilterValues.filter((service) => service.id !== service.id)
    )
  }

  return (
    <VStack w="100%" minH="calc(100vh - 96px)" h="100%" spacing={0} px={24}>
      <ServiceListProvider value={serviceListHandler}>
        <Stack w="100%" height="100%" display={{ base: 'none', md: 'inherit' }}>
          <HStack pt={16} pb={8} justifyContent="space-between" w="100%">
            <Heading size="2xl" textAlign="center">
              {listName}
            </Heading>
            <LinkBox>
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
          </HStack>

          <HStack w="100%" justifyContent="space-between">
            <SearchBar
              baseData={baseServices}
              setData={setServices}
              searchFields={['name', 'description']}
              w={{ base: '100%', sm: '60%' }}
              mb="24px"
            />

            {/*  https://react-select.com/advanced. Update the styling for this to be more dynamic and fit the provided spacing & make it fully functional  */}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text textAlign="center" px={2}>
                {' '}
                Filters
              </Text>
              <Select
                isMulti
                isSearchable
                closeMenuOnSelect={true}
                placeholder=""
                value={selectFilterValues.map((filter) => ({
                  label: filter.name,
                  value: filter,
                }))}
                options={services.map((s) => ({ value: s, label: s.name }))}
                onChange={(e, action) => {
                  switch (action.action) {
                    case 'remove-value':
                      removeFilter(action.removedValue.value)
                      break
                    case 'clear':
                      clearFilter()
                      break
                    default:
                      break
                  }
                  e
                    ? e.map((e) => {
                        updateFilters(e.value)
                      })
                    : null
                }}
                // onChange={(e) => { e ? e.map(e => { updateSelectFilter(e.value) }) : null }}
                menuPlacement="auto"
                menuPosition="fixed"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 16,
                })}
              />
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              pr={16}
            >
              <Text textAlign="center" px={2}>
                {' '}
                Results per page
              </Text>
              <Select
                isSearchable
                closeMenuOnSelect={true}
                placeholder={`${maxAmountDisplayed}`}
                options={displayAmountOptions}
                onChange={(e) => {
                  e ? setMaxAmountDisplayed(e.value) : null
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 16,
                })}
              />
            </Box>
          </HStack>

          <HStack
            display={{ base: 'none', md: 'inherit' }}
            w="100%"
            minH="calc(100vh - 96px)"
            h="100%"
            justifyContent="space-between"
            position="relative"
          >
            <Box w="55%">
              <PaginatedList
                list={services}
                useMinimalControls={true}
                itemsPerPage={maxAmountDisplayed}
                renderList={(list) => {
                  return (
                    <VStack
                      maxW="6xl"
                      px={2}
                      height="calc(100vh - 200px)"
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
                          list.map((item) => {
                            return (
                              <Box
                                // onMouseOver={() => setSelectedAddress(getAddress(item))}  hover over highlights a specific marker
                                // clicking on the service updates what services are visible on the map and the react-select component for filters
                                onClick={() => {
                                  updateFilters(item)
                                }}
                                w="100%"
                                cursor="pointer"
                                key={item.id}
                              >
                                <ServiceItem service={item} />
                              </Box>
                            )
                          })}
                        <Box pb={8}> {/* Just for styling purposes */} </Box>
                      </>
                    </VStack>
                  )
                }}
              />
              <Text textAlign="center" fontWeight="light">
                {' '}
                {` Showing ${
                  maxAmountDisplayed > services.length
                    ? services.length
                    : maxAmountDisplayed
                } out of ${services.length} results.`}{' '}
              </Text>
            </Box>
            <Center
              w="40%"
              height="100%"
              maxHeight="2xl"
              pos="absolute"
              right={0}
              borderRadius={36}
              overflow="hidden"
            >
              <Map
                defaultCenter={defaultMapCenter}
                addressIdToLabel={addressIdToServiceName}
                addresses={addresses}
                // selectedAddress={selectedAddress}
                filteredAddreses={filteredAddresses}
              />
            </Center>
          </HStack>
        </Stack>

        {/* Mobile View */}
        <Stack
          display={{ base: 'inherit', md: 'none' }}
          w="100%"
          minH="calc(100vh - 96px)"
          h="100%"
        >
          {/* <Heading size='md' color='black' pos='absolute' bottom={190} zIndex={1}> {listName} </ Heading> */}

          <Center
            w="100%"
            height="calc(100vh - 96px)"
            bottom="0"
            left="0"
            pos="absolute"
          >
            <Map
              defaultCenter={defaultMapCenter}
              addressIdToLabel={addressIdToServiceName}
              addresses={addresses}
              // selectedAddress={selectedAddress}
              filteredAddreses={filteredAddresses}
            />
          </Center>

          <HStack w="100%" bottom="2" left="0" pos="absolute" height="180px">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: true,
              }}
              // Can set pagination true/false for the dots underneath
              pagination={false}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {!isLoading &&
                services.map((service) => (
                  <SwiperSlide
                    key={service.id}
                    // onClick={() => setSelectedAddress(getAddress(service))} onTouchStart={() => { }}
                  >
                    <Box
                      cursor="pointer"
                      bg="#fafafa"
                      color="black"
                      rounded="lg"
                      h="100%"
                      maxW={'100%'}
                    >
                      <LinkBox>
                        <LinkOverlay
                          href={service.url}
                          _hover={{ textDecoration: 'underline' }}
                        >
                          <Text
                            fontSize="16px"
                            px={2}
                            py={2}
                            textAlign="center"
                          >
                            {' '}
                            {service.name}{' '}
                          </Text>
                        </LinkOverlay>
                      </LinkBox>
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </HStack>
        </Stack>
      </ServiceListProvider>
    </VStack>
  )
}

export default ListPage
