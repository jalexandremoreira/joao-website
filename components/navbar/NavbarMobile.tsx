import React from 'react';
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import Theme from '../../app/Theme';
import useAppDimensions from '../../hooks/useAppDimensions';
import { Close, Facebook, Instagram, LinkedIn, MenuHamburger } from '../Icons';

export default function Navbar() {
  const router = useRouter();
  const { paddingXMobile } = useAppDimensions();
  const { t } = useTranslation('navbar');

  const [open, setOpen] = React.useState(false);

  const colors = Theme.palette;

  const handleClose = () => setOpen(false);

  const bgColor = router.pathname !== '/about' ? 'white.main' : 'transparent';

  const Header = () => (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      onClick={() => setOpen(!open)}
      width="100%"
    >
      {router.pathname === '/' && !open ? (
        <Box width="10%" />
      ) : (
        <Box
          onClick={(e) => {
            console.log(e);
            e.stopPropagation();
            handleClose();
          }}
        >
          <Link href="/">
            <a>
              <Typography color="black.main" variant="h3">
                João Rosa
              </Typography>
            </a>
          </Link>
        </Box>
      )}

      {open ? (
        <Close size={40} color={colors.black.main} />
      ) : (
        <MenuHamburger size={40} color={colors.black.main} />
      )}
    </Stack>
  );

  return (
    <>
      <Box
        sx={{
          border: 'none',
          paddingX: paddingXMobile,
          paddingTop: '10px',
          width: '100%',
        }}
        bgcolor={bgColor}
      >
        <Header />
      </Box>

      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: colors.white.main,
          },
        }}
      >
        <Stack
          sx={{
            border: 'none',
            paddingX: paddingXMobile,
            paddingY: '10px',
            width: '100%',
          }}
          spacing="15px"
        >
          <Header />

          <Box width="100%" height="1px" bgcolor="black.main" />

          <Box onClick={handleClose}>
            <Stack direction="column" alignItems="flex-start" spacing="10px">
              <Stack direction="column" alignItems="flex-start">
                {[
                  { title: t('my-work'), link: '/my-work' },
                  { title: t('about'), link: '/about' },
                  { title: t('contact'), link: '/contact' },
                ].map(({ title, link }, index) => (
                  <Stack direction="column" alignItems="center" key={index}>
                    <Button>
                      <Link href={link}>
                        <a>
                          <Typography
                            color="black.main"
                            variant="h4"
                            sx={{
                              textDecoration:
                                router.pathname === link ? 'underline' : 'none',
                            }}
                          >
                            {title}
                          </Typography>
                        </a>
                      </Link>
                    </Button>
                  </Stack>
                ))}
              </Stack>

              <Box width="100%" height="1px" bgcolor="black.main" />

              <Stack className="user-link" direction="row" spacing="5px">
                {[
                  {
                    icon: <Instagram color={colors.black.main} size={35} />,
                    link: 'https://www.instagram.com/joao.rosa.22/',
                  },
                  {
                    icon: <LinkedIn color={colors.black.main} size={35} />,
                    link: 'https://www.linkedin.com/in/jo%C3%A3o-rosa-258699228/',
                  },
                  {
                    icon: <Facebook color={colors.black.main} size={35} />,
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
      </Drawer>
    </>
  );
}
