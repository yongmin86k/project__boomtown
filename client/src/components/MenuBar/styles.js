const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 0,
    width: theme.typography.pxToRem(48),
    height: theme.typography.pxToRem(48)
  },
  menuBar: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  imgLogo: {
    height: "100%"
  },
  btnShare: {
    boxShadow: "none",
    '&:hover': {
      boxShadow: "none",
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

export default styles;
