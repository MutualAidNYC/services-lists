import { Flex, HStack, VStack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { Service } from '../../models'
import { ServiceContainer } from './ServiceContainer'

interface ServiceProps {
    serviceList: Service[]
}

export const ServiceFreight: React.FC<ServiceProps> = ({ serviceList, ...props }: ServiceProps): JSX.Element => {
    useEffect(() => {
        console.log(serviceList);

    }
        , [])

    return (
        <VStack overflow="hidden" alignItems='left' padding='4px' maxWidth='40%'>
            {serviceList.map((service, index) => <ServiceContainer key={index} {...{service}} />)}
        </VStack>
    )
}


