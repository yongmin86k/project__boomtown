const styles = theme => ({
  // shareItemForm: {
  //   maxWidth: 500,
  //   margin: "0 auto"
  // },
  shareTitle: {
    fontWeight: 600
  },
  ShareItemFormContents: {
    marginBottom: theme.spacing(4)
  },
  ShareItemFormGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr) )",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(1)
  },
  ShareItemFormTag: {
    marginRight: 0
  },
  ShareItemFormTagLabel: {
    display: "flex",
    alignItems: "center",
    margin: 0
  }
});

export default styles;
