const styles = theme => ({
  page: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(10)
    }
  },
  preview: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  item: {
    maxWidth: "500px",
    width: "100%"
  },

  containerChildLeft: {
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-end"
    }
  },
  containerChildRight: {
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-start"
    }
  }
});

export default styles;
