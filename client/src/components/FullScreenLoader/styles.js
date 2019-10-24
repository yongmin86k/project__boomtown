const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.main,
    minHeight: "100vh"
  },
  progress: {
    marginBottom: theme.spacing(2)
  }
});

export default styles;
