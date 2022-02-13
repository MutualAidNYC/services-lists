import {
  Badge,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ServicesList } from 'models'
import { formatDate } from 'utils'

// import Swiper core required modules & style sheets
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'


interface ServicesListItemProps extends LinkBoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {

  // Airtable taxonomies field contains duplicates
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  const adjustName = (name: string, length: number) => {
    if (name.length >= length) {
      return name.substring(0, length - 2).replaceAll(',', '') + "..."
    }
    return name
  }

  return (
    <LinkBox {...props} my={2}>
      <Heading fontSize='subheading2' mb='16px'>
        <NextLink href={`/list/${encodeURIComponent(servicesList.id)}`} passHref>
          <LinkOverlay>
            {servicesList.name}
          </LinkOverlay>
        </NextLink>
        <Badge mx={4} px={2} py={1} rounded={16} colorScheme={servicesList.status == 'Published' ? 'green' : 'red'}>  Draft </Badge>
      </Heading>
      <Text>{servicesList.description}</Text>
      <Text>{`Created by ${servicesList.creator} on ${formatDate(servicesList.createdAt)}`}</Text>


      {/* Keeping this here in case we want to go back to this version
      <Wrap  alignContent='center' w='100%' display='flex' flexDirection='row' maxW='3xl' h='100%'>

        {taxonomies.map((taxonomy, i) => (
          <Text
            key={i}
            mx={2}
            bgColor='lightPink'
            borderRadius='15px'
            p='8px'
            maxW="240px"
            h="fit-content"
          >
            {taxonomy}
          </Text>
        ))}
      </Wrap> */}

      <Swiper
        grabCursor={true}
        slidesPerView={8}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className='mySwiper'
      >
        {taxonomies.map((taxonomy, i) => (
          <SwiperSlide key={i}>
            <Tooltip label={taxonomy} rounded='xl'>
              <Text
                mx={2}
                bgColor='lightPink'
                borderRadius='15px'
                p='8px'
                maxW='240px'
              >
                {adjustName(taxonomy, 18)}
              </Text>
            </Tooltip>
          </SwiperSlide>
        ))}



      </Swiper>




    </LinkBox>
  )
}

