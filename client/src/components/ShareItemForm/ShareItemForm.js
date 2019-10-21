import React, { Component } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Input,
  Button
} from "@material-ui/core";
import {
  AcUnit as AcUnitIcon,
  AccountBalance as AccountBalanceIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Adb as AdbIcon,
  AirportShuttle as AirportShuttleIcon,
  Album as AlbumIcon
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Form, Field } from "react-final-form";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = values => {};
  validate = values => {};

  render() {
    const { classes, tagInfo } = this.props;

    return (
      <section className={classes.shareItemForm}>
        <Typography
          gutterBottom
          variant="h3"
          component="h2"
          color="textPrimary"
          className={classes.shareTitle}
        >
          Share. Borrow. Prosper.
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* // */}
              <Field
                name="itemName"
                render={({ input, meta }) => (
                  <Input
                    required
                    className={classes.ShareItemFormContents}
                    type="text"
                    fullWidth
                    placeholder="Name your Item"
                    inputProps={{
                      "aria-label": "Item name"
                    }}
                    {...input}
                    value={input.value}
                  />
                )}
              />
              {/* // */}
              <Field
                name="itemDescription"
                render={({ input, meta }) => (
                  <Input
                    required
                    className={classes.ShareItemFormContents}
                    type="text"
                    fullWidth
                    placeholder="Describe your Item"
                    inputProps={{
                      "aria-label": "Item description"
                    }}
                    {...input}
                    value={input.value}
                  />
                )}
              />
              {/* // */}
              <div className={classes.ShareItemFormContents}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="p"
                  color="textPrimary"
                >
                  Add Tags:
                </Typography>
                <Field
                  name="itemTags"
                  render={({ input, meta }) => {
                    const { onChange } = input;
                    return (
                      <FormControl fullWidth>
                        <FormGroup className={classes.ShareItemFormGroup}>
                          {tagInfo.map((tag, index) => (
                            <FormControlLabel
                              className={classes.ShareItemFormTag}
                              key={tag.id}
                              control={<Checkbox value={tag.id} />}
                              label={
                                <p className={classes.ShareItemFormTagLabel}>
                                  {tag.title} &nbsp;
                                  {
                                    ({ index } =
                                      index === 0 ? (
                                        <AcUnitIcon />
                                      ) : index === 1 ? (
                                        <AccountBalanceIcon />
                                      ) : index === 2 ? (
                                        <AccountBalanceWalletIcon />
                                      ) : index === 3 ? (
                                        <AdbIcon />
                                      ) : index === 4 ? (
                                        <AirportShuttleIcon />
                                      ) : (
                                        <AlbumIcon />
                                      ))
                                  }
                                </p>
                              }
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    );
                  }}
                />
              </div>
              {/* // */}
              <Button
                variant="contained"
                color="secondary"
                disabled
                type="submit"
              >
                Share
              </Button>
            </form>
          )}
        />
      </section>
    );
  }
}

export default withStyles(styles)(ShareForm);
