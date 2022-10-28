import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import '../localization/i18n';
import FooterDesktop from '../components/footer/FooterDesktop';
import FooterMobile from '../components/footer/FooterMobile';
import NavbarDesktop from '../components/navbar/NavbarDesktop';
import NavbarMobile from '../components/navbar/NavbarMobile';
import Theme from '../app/Theme';
import useAppDimensions from '../hooks/useAppDimensions';

function MyApp({ Component, pageProps }: AppProps) {
  const { isMobile } = useAppDimensions();
  const router = useRouter();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const { white } = Theme.palette;

  //fix for "Unhandled Runtime Error Error: Hydration failed"
  if (!mounted) return null;

  return (
    <>
      <style jsx global>
        {`
          body {
            background: ${white.main};
          }
        `}
      </style>
      <ThemeProvider theme={Theme}>
        <Stack
          sx={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            // position: 'fixed',
            width: '100%',
            zIndex: '2',
          }}
        >
          <Stack
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'sticky',
              width: '100%',
              top: 0,
              zIndex: '1000',
            }}
          >
            {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
          </Stack>
          <Component {...pageProps} />
          {isMobile ? <FooterMobile /> : <FooterDesktop />}
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
