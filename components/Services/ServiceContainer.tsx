import { FormHelperText } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { Service } from '../../models'

interface ServiceProps {
    service: Service
}


export const ServiceContainer = ({service,...props}:ServiceProps):JSX.Element => {
   
    useEffect(() => {
        console.log(service);
        
        }
    , [])

    return (
        <Box borderWidth='2px' height='180px' boxShadow="xl" p="6" rounded="xl" bg="white" overflow="hidden" width='100%'> 
            <HStack> 
                <Text fontSize='16px' fontWeight='bold' paddingLeft='1%' paddingTop='4px'> {service.name }</Text>
                <Spacer />
                <Text> {service.address} </Text>
            </HStack>
            <Text fontStyle='italic' color='gray.500' > {service.description}</Text>
            <HStack>
                <Text> {service.url}</Text>
                <Text> {service.email}</Text>
                <Text> {service.phones[0]} </Text>
            </HStack>
        </Box>

    )
}
