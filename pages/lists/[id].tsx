import { AddIcon, ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Box, Flex, Spacer, Divider, Heading, HStack, VStack, Button, Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { SearchBar } from '../../components'
import { ServiceFreight } from '../../components/Services'
import { Service } from '../../models'

/* Using this as a temporary means of testing*/
const service1: Service = {
    name: "Organization Example ###",
    organizations: ["testOrg", "tests"],
    locations: ["everywhere, nowhere"],
    alternativeName: "string",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    url: "website.com",
    email: "email@email.com",
    status: "status",
    applicationProcess: "application process",
    waitTime: "wait time ",
    fees: "fees",
    accreditations: ["accreditation"],
    licenses: ["licenses"],
    phones: ["123-456-7890", "another number"],
    schedule: ["Schedule"],
    contacts: ["contacts"],
    id: "id (number or string)",
    interpretationServices: ["interpretationServices"],
    address: ["100 Test Value Dr"],
    xStatus: "xStatus",
    xAIRSTaxonomy: ["xAIRSTaxonomy"],
    programs: ["programs"],
    yNeighborhoods: ["yNeighborhoods"],
    yFacebook: "facebook",
    yInstagram: "instagram",
    yTwitter: "twitter",
    Communities: ["communities"]
}

const serviceList: Service[] = [service1, service1, service1,service1, service1,service1];


export default function ServiceList() {
    return (
        <VStack>
            <HStack flex='1' width='100%' flexDirection='row' justifyContent='space-between' alignItems='left'>
                <Heading> List Name </Heading>
                <Button colorScheme='teal' leftIcon={<AddIcon />}> Create a new List</Button>
            </HStack>
            
            <HStack flex='1' width='100%' flexDirection='row' justifyContent='left' alignItems='left'>
                <Menu>
                    <MenuButton as={Button} variant='outline' rounded='xl' rightIcon={<ChevronDownIcon />}>
                        Filter
                    </MenuButton>
                    <MenuList>
                        <MenuItem> Filter Action </MenuItem>
                        <MenuItem>Filter Action</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} variant='outline' rounded='xl' rightIcon={<ChevronDownIcon />}>
                        Filter
                    </MenuButton>
                    <MenuList>
                        <MenuItem> Filter Action </MenuItem>
                        <MenuItem>Filter Action</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Divider orientation="horizontal" />
            <HStack >
                <Box >
                    <ServiceFreight serviceList={serviceList} />
                </Box>
                
            </HStack>

        </VStack>

    )
}




