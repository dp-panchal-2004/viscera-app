import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

export type Theme = {
  typography: typeof typography;
  shadows: typeof shadows;
  palette: typeof palette;
};

export const useTheme = (): Theme => ({
  typography,
  shadows,
  palette,
});

export const theme: Theme = {
  typography,
  shadows,
  palette,
};
