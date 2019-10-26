const styles = theme => ({
  pageProfile: {
    background: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(11)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(18)
    }
  },
  gridProfile: {
    padding: theme.spacing(6)
  },
  cardProfileContent: {
    marginBottom: theme.spacing(2),
    padding: 0,
    "&:last-child": {
      margin: 0,
      padding: 0
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  gridProfileHeader: {
    marginTop: theme.spacing(6)
  }
});

export default styles;
