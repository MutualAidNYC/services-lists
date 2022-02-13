import { CloseIcon, LinkIcon } from '@chakra-ui/icons'
import { Heading, Center, HStack, Text, VStack, LinkBox, LinkOverlay, Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import { Map, ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'
import { Address, Service } from '../../models'


// Note: SwiperJS is for mobile version of this page.
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
// import required modules
import { EffectCoverflow, Pagination } from "swiper"



export const ListPage: NextPage = () => {
    const router = useRouter()

    const serviceListHandler = useServiceList(router.query.listId as string)

    const [selectedAddress, setSelectedAddress] = useState<Address>()
    const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([])
    const [filteredServices, setFilteredServices] = useState<Service[]>([])


    const {
        isLoading,
        listName,
        services,
        addressIdToServiceName,
        addresses,
        defaultMapCenter,
    } = serviceListHandler

    const adjustName = (name: string, length: number) => {
        if (name.length >= length) {
            return name.substring(0, length - 2).replaceAll(',', '') + "..."
        }
        return name
    }

    function getAddress(service: Service): Address | undefined {
        let res = undefined;
        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            if (service.address !== undefined && address.id === service.address[0]) {
                res = address
                break
            }
        }
        return res
    }

    useEffect(() => {
        let updatedFilter: Address[] = []
        for (let i = 0; i < filteredServices.length; i++) {
            let temp = getAddress(filteredServices[i])
            if (temp) {
                updatedFilter.push(temp)
            }
        }
        setFilteredAddresses(updatedFilter)
    }, [filteredServices])


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
        }

    }

    const removeFilter = (serviceToRemove: Service) => {
        setFilteredServices(filteredServices.filter((service) => service.id !== serviceToRemove.id))
    }


    return (

        <VStack w='100%' minH='calc(100vh - 96px)' h='100%' spacing={0} >
            <ServiceListProvider value={serviceListHandler}>
                <HStack display={{ base: 'none', md: 'inherit' }} w='100%' minH='calc(100vh - 96px)' h='100%' spacing={0} position='relative' >
                    <VStack w='50%' minH='calc(100vh - 96px)' h='100%' >
                        <Heading size='3xl' pt={4} pb={4} textAlign='center' >
                            {listName}
                        </Heading>

                        <Box display={filteredServices.length > 0 ? 'flex' : 'none'} flexShrink={1} flexDirection='row' mx={4} >

                            {filteredServices.map((service) => {
                                return (
                                    <Box display='flex' flexDirection='row' justifyContent={'space-between'} key={service.id} border='2px' borderRadius={8} borderColor='gray.500' mx={1} px={1} bg='teal.600' _hover={{ background: 'teal.500' }} >
                                        {adjustName(service.name, 16)}
                                        <CloseIcon mx={2} w={4} h={4} _hover={{ color: 'red' }} onClick={() => { removeFilter(service) }} pr={1} alignSelf='center' cursor='pointer' />
                                    </Box>
                                )
                            })}
                            <Box alignSelf='center'>
                                <CloseIcon onClick={() => {
                                    setFilteredServices([])
                                }} w={3} h={3} _hover={{ color: 'red' }} cursor='pointer' />
                            </Box>
                        </Box>

                        <VStack maxW='3xl' px={2} height='calc(100vh - 200px)' overflowY='scroll'
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
                                }
                            }} >

                            {!isLoading && services.map((service) =>
                                <Box onMouseOver={() => setSelectedAddress(getAddress(service))} onClick={() => updateFilters(service)} w='100%' cursor='pointer' key={service.id}>
                                    <ServiceItem
                                        service={service}
                                    />
                                </Box>
                            )}

                        </VStack>

                    </VStack>

                    <Center w='50%' height='100%' pos='absolute' right={0} borderLeft='2px'>
                        <Map
                            defaultCenter={defaultMapCenter}
                            addressIdToLabel={addressIdToServiceName}
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            filteredAddreses={filteredAddresses}

                        />
                    </Center>
                </HStack >



                <Box display={{ base: 'inherit', md: 'none' }} w='100%' minH='calc(100vh - 96px)' h='100%' >
                    <Heading size='md' color='black' pos='absolute' bottom={190} zIndex={1}> {listName} </ Heading>

                    <Center w='100%' height='calc(100vh - 96px)' pos='absolute'>
                        <Map
                            defaultCenter={defaultMapCenter}
                            addressIdToLabel={addressIdToServiceName}
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            filteredAddreses={filteredAddresses}

                        />
                    </Center>

                    <VStack bottom={2} height='180px' w='100%' pos='absolute' >
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper">
                            {!isLoading && services.map((service) =>
                                <SwiperSlide key={service.id} onClick={() => setSelectedAddress(getAddress(service))} onTouchStart={() => { }}>
                                    <Box cursor='pointer' bg='teal.700' color='white' rounded='lg' h='100%' >
                                        <LinkBox >
                                            <LinkOverlay href={service.url} _hover={{ textDecoration: 'underline' }}>
                                                <Text fontSize='16px' px={2} py={2} textAlign='center' > {service.name} </Text>
                                            </LinkOverlay>
                                        </LinkBox>

                                        <Text fontSize='12px' px={2} pb={2} textAlign='left' fontStyle='italic' > {getAddress(service)?.address_1} </Text>

                                        <Text fontSize='12px' px={2} pb={2} textAlign='left' fontStyle='italic' > {service.description}  </Text>

                                        {service.phoneNumbers ?
                                            <LinkBox>
                                                <LinkOverlay href={`tel:${service.phoneNumbers[0]}`} fontSize='12px' px={2} textAlign='left' fontStyle='italic'>
                                                    <Text fontSize='12px' px={2} textAlign='left' fontStyle='italic' >  {service.phoneNumbers[0]} </Text>
                                                </LinkOverlay>
                                            </LinkBox>
                                            : ''}

                                        {service.email && (
                                            <LinkBox>
                                                <LinkOverlay href={`mailto:${service.email}`} _hover={{ textDecoration: 'underline' }} >
                                                    <Text fontSize='12px' px={2} textAlign='left' fontStyle='italic' >  {service.email} </Text>
                                                </LinkOverlay>
                                            </LinkBox>
                                        )}
                                    </Box>
                                </SwiperSlide>
                            )}

                        </Swiper>

                    </VStack>

                </Box>

            </ServiceListProvider >
        </VStack >

    )
}

export default ListPage






