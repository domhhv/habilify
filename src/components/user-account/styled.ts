import { Button, DialogContent, IconButton, styled } from '@mui/joy';

import { StyledAppWideContainer } from '../styled';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  '& > div': {
    marginTop: theme.spacing(1),
  },
}));

export const StyledAuthButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary[100],
  '& svg': {
    color: theme.palette.primary[100],
  },
  [theme.getColorSchemeSelector('light')]: {
    backgroundColor: theme.palette.primary[600],
    '&:hover': {
      backgroundColor: theme.palette.primary[800],
    },
  },
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: theme.palette.primary[800],
    '&:hover': {
      backgroundColor: theme.palette.primary[900],
    },
  },
}));

export const StyledAccountPageContainer = styled(StyledAppWideContainer)({
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 52px)',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyleLogOutIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary[100],
  '& svg': {
    color: theme.palette.primary[100],
  },
  [theme.getColorSchemeSelector('light')]: {
    backgroundColor: theme.palette.primary[600],
  },
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: theme.palette.primary[900],
  },
}));

export const StyledAccountForm = styled('form')({
  width: 400,
});
