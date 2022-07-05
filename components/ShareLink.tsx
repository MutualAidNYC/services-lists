import { CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FacebookIcon, ShareIcon, TwitterIcon } from './Icons'

interface ShareLinkProps extends BoxProps {
  resourceURL: string
  text: string
  title: string
}

export const ShareLink = ({
  resourceURL,
  text,
  title,
}: ShareLinkProps): JSX.Element => {
  const [deviceType, setDeviceType] = useState('desktop')

  const getDeviceType = () => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return 'mobile'
    }
    return 'desktop'
  }

  const facebookAppID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? ''

  useEffect(() => {
    setDeviceType(getDeviceType())
  }, [])

  return (
    <>
      <Box display={deviceType === 'desktop' ? 'none' : 'initial'}>
        <ShareIcon
          onClick={() =>
            navigator.share({
              text: text,
              url: resourceURL,
              title: title,
            })
          }
        />
      </Box>
      <Box display={deviceType === 'desktop' ? 'initial' : 'none'}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Share"
            icon={<ShareIcon />}
            bgColor="white"
          />
          <MenuList w="120">
            <MenuItem
              onClick={() =>
                window.open(
                  'https://twitter.com/intent/tweet?text=' +
                    encodeURI(title) +
                    '&url=' +
                    encodeURI(resourceURL),
                  '_blank'
                )
              }
            >
              <TwitterIcon mr={2} />
              <Text fontSize={16}>Share on Twitter</Text>
            </MenuItem>
            <MenuItem
              onClick={() =>
                window.open(
                  'https://www.facebook.com/dialog/share?href=' +
                    encodeURI(resourceURL) +
                    '&dialog=popup&app_id=' +
                    facebookAppID,
                  '_blank'
                )
              }
              justifyContent="left"
            >
              <FacebookIcon mr={2} />
              Share on Facebook
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigator.clipboard.writeText(resourceURL)
              }}
            >
              <CopyIcon mr={2} />
              <Text fontSize={16}> Copy to clipboard</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  )
}
