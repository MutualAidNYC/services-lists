import { Flex, HStack, Link, Image } from '@chakra-ui/react'

export const Navbar = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      bgColor="darkTeal"
      color="white"
      px="32px"
      py="32px"
      justify="space-between"
    >
      <Link href="/">
        <Image
          src="/manyc_logo_no_background.png"
          w="108px"
          h="96px"
          alt="Mutual Aid NYC"
        />
      </Link>
      <HStack spacing="32px">
        <Link href="/">Resource Lists</Link>
        <Link href="https://resources.mutualaid.nyc/">Resource Directory</Link>
        <Link href="/create-list">Create New List</Link>
        <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
      </HStack>
    </Flex>
  )
}
