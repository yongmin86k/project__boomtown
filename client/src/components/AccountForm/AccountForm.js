import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  TextField
} from "@material-ui/core";
import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
import { graphql, compose } from "react-apollo";
import validate from "./helpers/validation";

import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
      error: null
    };
  }

  render() {
    const { classes, LOGIN_MUTATION, SIGNUP_MUTATION } = this.props;
    const BoolFormToggle = this.state.formToggle;

    return (
      <Form
        onSubmit={async values => {
          if (this.state.error) {
          } else {
            try {
              BoolFormToggle
                ? await LOGIN_MUTATION({ variables: { user: values } })
                : await SIGNUP_MUTATION({ variables: { user: values } });
            } catch (e) {
              this.setState({ error: { database: { ...e } } });
            }
          }
        }}
        validate={values => {
          if (values.email) {
            const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
            if (!validEmail.test(values.email)) {
              this.setState({
                error: { email: "Please type a proper email address" }
              });
            } else {
              this.setState({
                error: null
              });
            }
          }
          return validate(values, BoolFormToggle);
        }}
        render={({ handleSubmit, form, valid, submitSucceeded }) => {
          return (
            <form
              onSubmit={e => {
                handleSubmit(e);
                form.reset();
              }}
              noValidate
              className={classes.accountForm}
            >
              {!BoolFormToggle && (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="fullname">Username</InputLabel>
                  <Field
                    name="fullname"
                    render={({ input, meta }) => (
                      <Input
                        id="fullname"
                        inputProps={{
                          autoComplete: "off"
                        }}
                        {...input}
                        type="text"
                        value={input.value}
                      />
                    )}
                  />
                </FormControl>
              )}
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <Input
                      id="email"
                      inputProps={{
                        autoComplete: "off"
                      }}
                      {...input}
                      type="text"
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <TextField
                      id="password"
                      label="Password"
                      autoComplete="off"
                      {...input}
                      type="password"
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    className={classes.formButton}
                    variant="contained"
                    size="large"
                    color="secondary"
                    disabled={!valid}
                  >
                    {BoolFormToggle ? "Enter" : "Create Account"}
                  </Button>
                  <Typography>
                    <button
                      className={classes.formToggle}
                      type="button"
                      onClick={() => {
                        this.setState({
                          formToggle: !BoolFormToggle
                        });
                      }}
                    >
                      {BoolFormToggle
                        ? "Create an account."
                        : "Login to existing account."}
                    </button>
                  </Typography>
                </Grid>
              </FormControl>
              <Typography className={classes.errorMessage}>
                {submitSucceeded && this.state.error
                  ? this.state.error.email
                    ? this.state.error.email
                    : this.state.error.database
                    ? this.state.error.database.message.split(": ")[1]
                    : ""
                  : ""}
              </Typography>
            </form>
          );
        }}
      ></Form>
    );
  }
}

const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGIN_MUTATION, {
    options: { refetchQueries },
    name: "LOGIN_MUTATION"
  }),
  graphql(SIGNUP_MUTATION, {
    options: { refetchQueries },
    name: "SIGNUP_MUTATION"
  }),
  withStyles(styles)
)(AccountForm);
