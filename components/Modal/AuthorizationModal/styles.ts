import { makeStyles } from '@material-ui/core';

export const useCommonStyles = makeStyles(({ palette }) => ({
  icon: {
    fontSize: '4.5rem',
    color: palette.primary.main,
  },
  text: {
    fontSize: '16px',
  },
  leftButton: {
    marginRight: '1rem',
  },
  title: {
    fontSize: '24px',
  },
  closeIcon: {
    color: palette.grey['500'],
    fontSize: '1.8rem',
    '&:hover': {
      opacity: 0.7,
      cursor: 'pointer',
    },
  },
  logo: {
    margin: '0px 0px 16px',
    height: 'unset',
  },
}));
