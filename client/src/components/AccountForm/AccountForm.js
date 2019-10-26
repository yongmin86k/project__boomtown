import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
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
          this.setState({ error: null });
          try {
            BoolFormToggle
              ? await LOGIN_MUTATION({ variables: { user: values } })
              : await SIGNUP_MUTATION({ variables: { user: values } });
          } catch (e) {
            this.setState({ error: e });
          }
        }}
        validate={values => {
          return validate(values, BoolFormToggle);
        }}
        render={({ handleSubmit, form, valid, submitting }) => {
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
                        type="text"
                        inputProps={{
                          autoComplete: "off"
                        }}
                        {...input}
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
                      type="text"
                      inputProps={{
                        autoComplete: "off"
                      }}
                      {...input}
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <Input
                      id="password"
                      type="password"
                      inputProps={{
                        autoComplete: "off"
                      }}
                      {...input}
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
                {this.state.error
                  ? this.state.error.message.split(": ")[1]
                  : ""}
              </Typography>
            </form>
          );
        }}
      ></Form>
    );
  }
}

// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
export default compose(
  graphql(LOGIN_MUTATION, { name: "LOGIN_MUTATION" }),
  graphql(SIGNUP_MUTATION, { name: "SIGNUP_MUTATION" }),
  withStyles(styles)
)(AccountForm);
