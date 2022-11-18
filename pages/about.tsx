import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import desktopImage from '../public/images/about-me-desktop.png';
import mobileImage from '../public/images/about-me-mobile.png';
import Layout from '../components/Layout';
import useAppDimensions from '../hooks/useAppDimensions';
import useWindowSize from '../hooks/useWindowSize';

const About: NextPage = () => {
  const { width } = useWindowSize();
  const { isMobile, paddingXMobile } = useAppDimensions();
  const { t } = useTranslation('about');

  const about: string[] = t('body', { returnObjects: true });

  const widthLimitA = 1390;
  const widthLimitB = 1260;
  const desktopImageWidth =
    width > widthLimitA ? '546px' : width > widthLimitB ? '434px' : '344px'; // 344
  const desktopImageHeight =
    width > widthLimitA ? '922px' : width > widthLimitB ? '732px' : '580px'; //580
  const stackDirection = width > 900 ? 'row' : 'column';
  const paragraphWidth = '100%';

  if (isMobile) {
    return (
      <Layout pageTitle={t('page-title')} centered>
        <Stack
          flex={1}
          id="mobile-about-scrollbar"
          justifyContent="flex-start"
          height="100%"
          direction="column"
          spacing="10px"
          width="100%"
        >
          <Box
            zIndex={0}
            style={{
              filter: 'blur(0.4px)',
              height: width * 1.6144,
              width: width,
            }}
            // marginX="-15px"
            position="fixed"
            top={0}
            left={0}
          >
            <Image
              src={mobileImage.src}
              alt="about-page-background"
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
          </Box>

          <Box height={width * 1.2} />

          <Stack
            alignItems="center"
            bgcolor="white.main"
            id="about-me-title-mobile"
            paddingY="20px"
            paddingX={paddingXMobile}
            spacing="25px"
            width="100%"
            zIndex={1}
            sx={{
              borderTopLeftRadius: '30px',
              borderTopRightRadius: '30px',
            }}
          >
            <Typography
              alignSelf="center"
              color="black.main"
              variant="h4"
              zIndex={2}
            >
              {t('title')}
            </Typography>

            {about.map((paragraph, index) => (
              <Typography
                key={index}
                className="Roboto"
                color="black.main"
                zIndex={2}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="About me" centered>
      <Stack direction={stackDirection} spacing={8}>
        <Image
          width={desktopImageWidth}
          height={desktopImageHeight}
          src={desktopImage.src}
          alt="about-page-background"
          // layout="responsive"
          objectFit="contain"
          loading="lazy"
        />

        <Stack
          flex={1}
          justifyContent="center"
          height="100%"
          direction="column"
          maxWidth={paragraphWidth}
          spacing="20px"
          width="100%"
        >
          <Typography alignSelf="center" color="black.main" variant="h2">
            {t('title')}
          </Typography>

          {about.map((paragraph, index) => (
            <Typography
              key={index}
              className="Roboto"
              color="black.main"
              zIndex={2}
            >
              {paragraph}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default About;
