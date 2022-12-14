import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
// import { useRouter } from 'next/router';

import '../localization/i18n';
import FooterDesktop from '../components/footer/FooterDesktop';
import FooterMobile from '../components/footer/FooterMobile';
import NavbarDesktop from '../components/navbar/NavbarDesktop';
import NavbarMobile from '../components/navbar/NavbarMobile';
import Theme from '../app/Theme';
import useAppDimensions from '../hooks/useAppDimensions';
import useWindowSize from '../hooks/useWindowSize';

function MyApp({ Component, pageProps }: AppProps) {
  const { width } = useWindowSize();
  const { isMobile } = useAppDimensions();
  // const router = useRouter();

  const [mounted, setMounted] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { white } = Theme.palette;

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

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
            {isMobile || width < 600 ? (
              <NavbarMobile scrollPosition={scrollPosition} />
            ) : (
              <NavbarDesktop />
            )}
          </Stack>
          <Component {...pageProps} />
          {isMobile ? <FooterMobile /> : <FooterDesktop />}
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
