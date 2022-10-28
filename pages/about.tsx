import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import desktopImage from '../public/images/about-me-desktop.png';
import Layout from '../components/Layout';
import useAppDimensions from '../hooks/useAppDimensions';
import useWindowSize from '../hooks/useWindowSize';

const About: NextPage = () => {
  const { width } = useWindowSize();
  const { isMobile } = useAppDimensions();
  const { t } = useTranslation('about');

  const about: string[] = t('body', { returnObjects: true });

  const widthLimitA = 1390;
  const widthLimitB = 1260;
  const desktopImageWidth =
    width > widthLimitA ? '546px' : width > widthLimitB ? '434px' : '344px'; // 344
  const desktopImageHeight =
    width > widthLimitA ? '922px' : width > widthLimitB ? '732px' : '580px'; //580

  if (isMobile) {
    return (
      <Layout pageTitle={t('page-title')} centered>
        <Stack
          flex={1}
          id="about-container"
          justifyContent="flex-start"
          height="100%"
          direction="column"
          spacing="10px"
          width="100%"
        >
          {/* <Box
            zIndex={0}
            style={{
              filter: 'blur(0.4px)',
              height: '297px',
              width: '100vw',
            }}
            marginX="-15px"
            position="relative"
            top={0}
          >
            <Image
              src={aboutMobile.src}
              alt="about-page-background"
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
          </Box> */}

          <Stack alignItems="center" id="about-me-title-mobile" width="100%">
            <Typography
              alignSelf="center"
              color="black.main"
              variant="h2"
              zIndex={2}
            >
              {t('title')}
            </Typography>
          </Stack>

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
      </Layout>
    );
  }

  return (
    <Layout pageTitle="About me" centered>
      <Stack direction="row" spacing={8}>
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
          maxWidth="500px"
          spacing="20px"
          width="100%"
        >
          <Typography
            alignSelf="center"
            color="black.main"
            variant="h2"
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
};

export default About;
