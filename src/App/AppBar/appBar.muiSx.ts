import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

export const useStylesAppbar = makeStyles((theme: Theme) =>
  createStyles({
    AppBarSx: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-around',
        /*        backgroundColor: theme.palette.primary.main,*/
      },
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
    appBarLeftSx: {
      [theme.breakpoints.down('sm')]: {
        margin: '0px 0px 0px 0px!important',
      },
      [theme.breakpoints.down('xs')]: {
        margin: '0px 0px 0px 40px!important',
      },
    },
    appBarRightSx: {
      [theme.breakpoints.down('sm')]: {
        margin: '0px 0px 0px 0px!important',
      },
      [theme.breakpoints.down('xs')]: {
        margin: '0px 25px 0px 0px!important',
      },
    },
    appBarIconItSx: {
      [theme.breakpoints.down('xs')]: {
        width: 100,
        height: 100,
        margin: '0!important',
      },
    },
  })
)

export const defaultBoxSx = {
  width: '100%',
}

export const appBarSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
  borderRadius: '2px',
  width: '100%',
  '& > :not(style)': {
    m: 1,
    margin: '0px 100px 0px 100px',
  },
}

export const appBarLeftSx = {
  display: 'flex',
  '& > :not(style)': {
    margin: '0px 10px',
  },
}

export const appBarRightSx = {
  display: 'flex',
  '& > :not(style)': {
    margin: '0px 10px',
  },
}

export const iconItSx = {
  display: 'flex',
  alignItems: 'center',
  width: 250,
  height: 80,
}

export const colorBlack = {
  color: 'black',
}
export const iconButtonSx = {
  ml: 2,
  '&.MuiIconButton-root': {
    padding: 0,
    marginLeft: '9px',
    marginTop: '2px',
  },
}

export const menuPaperPropsSx = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}
export const imgSx = {
  width: '100px',
  cursor: 'pointer',
}
export const containerPackMenuSx = { display: 'flex', alignItems: 'center', textAlign: 'center' }
