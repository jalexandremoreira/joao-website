import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import ContactCard from '../components/ContactCard';
import Layout from '../components/Layout';
import useAppDimensions from '../hooks/useAppDimensions';
import { Close } from '../components/Icons';

const Contact: NextPage = () => {
  const { isMobile } = useAppDimensions();
  const { t } = useTranslation('contact');

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const alertAnchor: SnackbarOrigin = {
    vertical: isMobile ? 'bottom' : 'top',
    horizontal: 'center',
  };

  if (isMobile) {
    return (
      <Layout pageTitle={t('page-title')} centered>
        <Snackbar
          anchorOrigin={alertAnchor}
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close size={20} color="black" />
            </IconButton>
          }
        >
          <Alert
            onClose={handleClose}
            severity={errorMessage ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>

        <ContactCard
          setMessage={setMessage}
          setOpen={setOpen}
          setErrorMessage={setErrorMessage}
        />
      </Layout>
    );
  }

  return (
    <Layout pageTitle={t('page-title')} centered>
      <Snackbar
        anchorOrigin={alertAnchor}
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close size={20} color="white" />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Stack
        alignSelf="center"
        flex={1}
        id="about-container"
        justifyContent="center"
        height="100%"
        direction="column"
        maxWidth="500px"
        spacing="20px"
        width="100%"
      >
        <ContactCard
          setMessage={setMessage}
          setOpen={setOpen}
          setErrorMessage={setErrorMessage}
        />
      </Stack>
    </Layout>
  );
};

export default Contact;
