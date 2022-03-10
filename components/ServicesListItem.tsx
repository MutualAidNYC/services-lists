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

export const ServicesListItem = ({
  servicesList,
  ...props
}: ServicesListItemProps): JSX.Element => {
  // Airtable taxonomies field contains duplicates
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  const adjustName = (name: string, length: number) => {
    if (name.length >= length) {
      return name.substring(0, length - 2).replaceAll(',', '') + '...'
    }
    return name
  }

  return (
    <LinkBox {...props} my={2}>
      <Heading fontSize="subheading2" mb="16px">
        <NextLink
          href={`/list/${encodeURIComponent(servicesList.id)}`}
          passHref
        >
          <LinkOverlay>{servicesList.name}</LinkOverlay>
        </NextLink>
        <Badge
          mx={4}
          px={2}
          py={1}
          rounded={16}
          colorScheme={servicesList.Status == 'Published' ? 'green' : 'red'}
        >
          {' '}
          {servicesList.Status}{' '}
        </Badge>
      </Heading>
      <Text>{servicesList.description}</Text>
      <Text>{`Created by ${servicesList.creator} on ${formatDate(
        servicesList.createdAt
      )}`}</Text>

      <Swiper
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
          320: {
            slidesPerView: 2,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {taxonomies.map((taxonomy, i) => (
          <SwiperSlide key={i}>
            <Tooltip label={taxonomy} rounded="xl">
              <Text
                mx={2}
                bgColor="lightPink"
                borderRadius="15px"
                p="8px"
                textAlign="center"
                maxW="200px"
                height="fit-content"
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
