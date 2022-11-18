import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// import NavbarMenu from './NavbarMenu';
import Theme from '../../app/Theme';
import useAppDimensions from '../../hooks/useAppDimensions';
import { Instagram, LinkedIn, Facebook } from '../Icons';
import useWindowSize from '../../hooks/useWindowSize';

// import { LogoLarge } from '../Logos';
// import { Settings, MenuHamburger } from '../Icons';

export default function Navbar() {
  const { width } = useWindowSize();

  const { maxWidthDesktop, paddingXDesktop } = useAppDimensions();
  const router = useRouter();
  const { t } = useTranslation('navbar');

  const colors = Theme.palette;

  const sidesMinWidth = width < 792 ? 0 : '212px';
  const titleSize = width < 830 ? (width < 792 ? 'h4' : 'h3') : 'h2';
  const linksSize = width < 820 ? 'h6' : 'h5';
  const iconsSize = width < 792 ? 28 : 35;

  return (
    <Stack
      alignItems="center"
      bgcolor={colors.white.main}
      className="navbar navbar-desktop"
      justifyContent="center"
      left={0}
      maxHeight="115px"
      paddingTop="30px"
      paddingY="12px"
      top={0}
      width="100%"
      zIndex={100}
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        margin="auto"
        maxWidth={maxWidthDesktop}
        paddingX={paddingXDesktop}
        height="47px"
        width="100%"
      >
        {router.pathname === '/' ? (
          <Box minWidth={sidesMinWidth} />
        ) : (
          <Link href="/">
            <a>
              <Typography
                minWidth={sidesMinWidth}
                variant={titleSize}
                color="black.main"
              >
                João Rosa
              </Typography>
            </a>
          </Link>
        )}

        <Stack
          alignItems="center"
          className="user-link"
          direction="row"
          justifyContent="space-between"
          spacing="10px"
          height="100%"
          marginTop="4px"
        >
          {[
            { title: t('my-work'), link: '/my-work' },
            { title: t('about'), link: '/about' },
            { title: t('contact'), link: '/contact' },
          ].map(({ title, link }, index) => (
            <Stack key={index} direction="row" spacing="10px">
              <Stack direction="column" alignItems="center">
                <Link href={link}>
                  <a>
                    <Typography
                      color="black.main"
                      variant={linksSize}
                      sx={{
                        textDecoration:
                          router.pathname === link ? 'underline' : 'none',
                      }}
                    >
                      {title}
                    </Typography>
                  </a>
                </Link>
              </Stack>

              {index !== 2 && (
                <Typography color="black.main" variant="h5">
                  |
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>

        <Stack
          minWidth={sidesMinWidth}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Stack
            className="user-link"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            {[
              {
                icon: <Instagram color={colors.black.main} size={iconsSize} />,
                link: 'https://www.instagram.com/joao.rosa.22/',
              },
              {
                icon: <LinkedIn color={colors.black.main} size={iconsSize} />,
                link: 'https://www.linkedin.com/in/jo%C3%A3o-rosa-258699228/',
              },
              {
                icon: <Facebook color={colors.black.main} size={iconsSize} />,
                link: 'https://www.facebook.com/joao.p.rosa.35',
              },
            ].map(({ icon, link }, index) => (
              <Link href={link} key={index}>
                <a target="_blank">{icon}</a>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
