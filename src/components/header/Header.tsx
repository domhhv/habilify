import { AuthModalButton } from '@components';
import { Button } from '@mui/joy';
import React from 'react';
import { Link } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';
import {
  StyledAppHeader,
  StyledAppHeaderContent,
  StyledButtonsContainer,
} from './styled';

const Header = () => {
  return (
    <StyledAppHeader>
      <StyledAppHeaderContent>
        <StyledButtonsContainer>
          <Button component={Link} to="/calendar">
            Calendar
          </Button>
          <Button component={Link} to="/habits">
            Habits
          </Button>
          <ThemeToggle />
        </StyledButtonsContainer>
        <AuthModalButton />
      </StyledAppHeaderContent>
    </StyledAppHeader>
  );
};

export default Header;
