import { ArrowDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Map, SearchBar, ServiceItem, ShareLink } from 'components'
import { AddressWithLabel, Service } from 'models'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { PaginatedList } from 'react-paginated-list'
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from 'react-select'
import { useServiceList } from '../../hooks'

const getAddressWithLabel = (
  service: Service
): AddressWithLabel | undefined => {
  if (service && service['x-streetAddress']) {
    return {
      streetAddress: service['x-streetAddress'],
      city: service['x-city'],
      state: service['x-state'],
      zip: service['x-zip'],
      latitude: service['y-latitude'],
      longitude: service['y-longitude'],
      label: service.name,
    } as unknown as AddressWithLabel
  }
}

type CollectionPageProps = { location: string }

export const getServerSideProps: GetServerSideProps<
  CollectionPageProps
> = async (context) => ({
  props: {
    location: context.req.headers.referer ?? '',
  },
})

export const CollectionPage: NextPage<CollectionPageProps> = (
  props: CollectionPageProps
) => {
  const router = useRouter()

  const serviceListHandler = useServiceList(router.query.listId as string)

  const {
    isLoading,
    collection,
    visibleServices,
    numServices,
    setSearchQuery,
    defaultMapCenter,
  } = serviceListHandler
  console.log("service list: ", visibleServices)
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

  const [selectedAddress, setSelectedAddress] = useState<AddressWithLabel>()
  const {taxonomyFilters, setTaxonomyFilters} = serviceListHandler

  const getAllUniqueTaxonomies = (): string[] => {
    const taxonomies: string[] = []
    for (let i = 0; i < visibleServices.length; i++) {
      const serviceTaxonomies = visibleServices[i]?.needFocus
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
        const taxonomies = list[i].needFocus
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

  const getFilteredAddressList = (
    resources: Service[]
  ): AddressWithLabel[] => {
    const addressArr = []
    for (let i = 0; i < resources.length; i++) {
      const address = getAddressWithLabel(resources[i])
      if (address) {
        addressArr.push(address)
      }
    }
    return addressArr
  }

  return (
    <VStack
      w="100%"
      minH="calc(100vh - 96px)"
      h="100%"
      spacing={8}
      px={{ base: 2, md: 24 }}
      py={8}
    >
      <NextSeo
        title={collection?.name || 'loading list...'}
        description={collection?.description || collection?.name}
        canonical="https://lists.mutualaid.nyc/list"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `https://lists.mutualaid.nyc/list/${router.query.listId}`,
          siteName: 'Mutual Aid NYC',
          title: collection?.name,
          description: collection?.description || collection?.name,
          images: [
            {
              url: 'https://lists.mutualaid.nyc/manyc_logo.png',
              type: 'png',
              alt: 'Mutual Aid NYC Banner',
            },
          ],
        }}
      />
      <Head>
        <title>{collection?.name}</title>
        <meta name="description" content={collection?.name} />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Stack spacing={8} w="100%" height="100%">
        <Stack spacing={4}>
          <HStack>
            <Heading as="h1">{collection?.name}</Heading>
            {collection && (
              <ShareLink
                url={props.location}
                text={collection.description}
                title={collection.name}
              />
            )}
          </HStack>
          {collection?.creator && (
            <Text fontSize="xl">{`Created by ${collection.creator}`}</Text>
          )}
          <Text>{collection?.description}</Text>
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
                    pt={4}
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
                        list.filter(item => item).map((item: Service) => {
                          return (
                            <Box w="100%" cursor="pointer" key={item?.id}>
                              <ServiceItem
                                service={item}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                                getAddressWithLabel={getAddressWithLabel}
                              />
                            </Box>
                          )
                        })}
                      {isLoading && <Spinner variant={'primary'} />}
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
                    setTaxonomyFilters(e ? e.map((o) => o.value) : [])
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
                addresses={getFilteredAddressList(
                  getFilteredList(visibleServices)
                )}
                selectedAddress={selectedAddress}
                width={`${
                  typeof window != 'undefined' ? window.screen.width * 45 : 300
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
    </VStack>
  )
}

export default CollectionPage
