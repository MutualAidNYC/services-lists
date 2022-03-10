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
import React, { useState } from 'react'
import { Map, SearchBar, ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'
import { Address, Service } from '../../models'
import { PaginatedList } from 'react-paginated-list'
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from 'react-select'

// Import Swiper styles & required modules
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper'

export const ListPage: NextPage = () => {
  const router = useRouter()

  const serviceListHandler = useServiceList(router.query.listId as string)

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
    for (let i = 0; i < services.length; i++) {
      const serviceTaxonomies = services[i].taxonomyString
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

          <HStack w="100%" justifyContent="left" spacing={4}>
            <SearchBar
              baseData={baseServices}
              setData={setServices}
              searchFields={['name', 'description']}
              w={{ base: '100%', sm: '60%' }}
              mb="24px"
            />

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
                list={getFilteredList(services)}
                useMinimalControls={true}
                itemsPerPage={maxAmountDisplayed}
                renderList={(list: Service[]) => {
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
              w="44%"
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
                addresses={getFilteredAddressList(getFilteredList(services))}
                selectedAddress={selectedAddress}
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
