import React from 'react';
import Link from 'next/link';
import { Button, Drawer, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Instagram, LinkedIn, Facebook, Portugal, UK } from '../Icons';
import Theme from '../../app/Theme';

const FooterMobile = () => {
  const { t, i18n } = useTranslation('footer');
  const colors = Theme.palette;

  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer =
    (anchor: 'bottom', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleLanguage = () => {
    if (i18n.language === 'pt-PT') {
      i18n.changeLanguage('en-US');
    } else {
      i18n.changeLanguage('pt-PT');
    }
  };

  const Links = () => (
    <Stack
      sx={{
        paddingY: '20px',
        paddingX: '10px',
        width: '100%',
        bgcolor: 'white.main',
      }}
      spacing="5px"
      role="presentation"
      // onClick={toggleDrawer('bottom', false)}
      onKeyDown={toggleDrawer('bottom', false)}
    >
      {[
        {
          icon: <Instagram color={colors.black.main} size={30} />,
          link: 'https://www.instagram.com/joao.rosa.22/',
          name: 'instagram',
        },
        {
          icon: <LinkedIn color={colors.black.main} size={30} />,
          link: 'https://www.linkedin.com/in/jo%C3%A3o-rosa-258699228/',
          name: 'linkedin',
        },
        {
          icon: <Facebook color={colors.black.main} size={30} />,
          link: 'https://www.facebook.com/joao.p.rosa.35',
          name: 'facebook',
        },
      ].map(({ icon, link, name }, index) => (
        <Link href={link} key={index}>
          <a target="_blank">
            <Button>
              <Stack direction="row" spacing="10px" alignItems="flex-end">
                {icon}
                <Typography variant="h6" color="black.main" className="Roboto">
                  {name}
                </Typography>
              </Stack>
            </Button>
          </a>
        </Link>
      ))}
    </Stack>
  );

  return (
    <Stack alignItems="center" direction="column" paddingY="15px" zIndex={5}>
      <Stack
        alignItems="center"
        className="user-link"
        direction="row"
        justifyContent="space-evenly"
        // spacing={1}
        height="100%"
      >
        <Link href="/contact">
          <a>
            <Button>
              <Typography color="black.main" variant="caption">
                {t('contact')}
              </Typography>
            </Button>
          </a>
        </Link>
        <Typography color="black.main" variant="caption">
          |
        </Typography>
        <Button
          onClick={toggleDrawer('bottom', true)}
          sx={{
            padding: 0,
          }}
        >
          <Typography color="black.main" variant="caption">
            {t('links')}
          </Typography>
        </Button>
        <Drawer
          anchor={'bottom'}
          open={state['bottom']}
          onClose={toggleDrawer('bottom', false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              bgcolor: 'black.800',
            },
          }}
        >
          <Links />
        </Drawer>
        <Typography color="black.main" variant="caption">
          |
        </Typography>
        <Button
          onClick={handleLanguage}
          // endIcon={
          //   i18n.language === 'en-US' ? (
          //     <Portugal size={15} />
          //   ) : (
          //     <UK size={15} />
          //   )
          // }
        >
          <Typography color="black.main" variant="caption">
            {i18n.language === 'en-US' ? 'português' : 'english'}
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default FooterMobile;
