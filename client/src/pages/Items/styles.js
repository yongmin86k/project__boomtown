const styles = theme => ({
  pageItems: {
    background: theme.palette.secondary.main,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(11)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(18)
    }
  }
});

export default styles;
