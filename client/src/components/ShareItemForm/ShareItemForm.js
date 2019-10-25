import React, { Component, Fragment } from "react";
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
import { Form, Field, FormSpy } from "react-final-form";

import { ItemPreviewContext } from "../../context/ItemPreviewProvider";

import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";

class ShareForm extends Component {
  constructor(props) {
    super(props);
  }

  validate = ({ title, description }) => {
    const errors = {};
    if (!title) {
      errors.title = "Required";
    }
    if (!description) {
      errors.description = "Required";
    }
    return errors;
  };

  applyTags = (tags, tagInfo) => {
    return tags.map(tag => {
      const updatedTag = { title: tag };
      tagInfo.filter(t => {
        if (t.title === tag) {
          updatedTag.id = t.id;
        }
      });
      return updatedTag;
    });
  };

  dispatchUpdate = (values, tagInfo, updatePreview) => {
    updatePreview({
      ...values,
      tags: this.applyTags(values.tags || [], tagInfo)
      // 'null' can't use the .map() method
    });
  };

  saveItems = (values, tagInfo, addItem) => {
    addItem({
      variables: {
        title: values.title,
        description: values.description,
        tags: this.applyTags(values.tags || [], tagInfo),
        imageurl: values.imageurl
      }
    });
  };

  render() {
    const { classes, tagInfo } = this.props;

    return (
      <ItemPreviewContext.Consumer>
        {({ updatePreview, resetPreview }) => {
          return (
            <Fragment>
              <Typography
                gutterBottom
                variant="h3"
                component="h2"
                color="textPrimary"
                className={classes.shareTitle}
              >
                Share. Borrow. Prosper.
              </Typography>
              {/*
              Mutation ::
              */}
              <Mutation mutation={ADD_ITEM_MUTATION}>
                {(addItem, { loading, error, data }) => {
                  return (
                    <Form
                      onSubmit={values => {
                        this.saveItems(values, tagInfo, addItem);
                      }}
                      validate={this.validate}
                      render={({ handleSubmit, form, valid }) => (
                        <Fragment>
                          <form
                            onSubmit={e => {
                              handleSubmit(e);
                              form.reset();
                              resetPreview();
                            }}
                          >
                            <FormSpy
                              subscription={{ values: true }}
                              onChange={({ values }) => {
                                if (values) {
                                  this.dispatchUpdate(
                                    values,
                                    tagInfo,
                                    updatePreview
                                  );
                                }
                                return "";
                              }}
                            />
                            {/* end FormSpy */}
                            <Field
                              name="imageurl"
                              render={({ input, meta }) => (
                                <Input
                                  className={classes.ShareItemFormContents}
                                  type="text"
                                  fullWidth
                                  placeholder="Image url of your Item"
                                  inputProps={{
                                    "aria-label": "Item url"
                                  }}
                                  {...input}
                                  value={input.value}
                                />
                              )}
                            />
                            <Field
                              name="title"
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
                              name="description"
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
                              <FormControl fullWidth>
                                <FormGroup
                                  className={classes.ShareItemFormGroup}
                                >
                                  {tagInfo.map((tag, index) => {
                                    return (
                                      <Field
                                        key={tag.id}
                                        name="tags"
                                        type="checkbox"
                                        value={tag.title}
                                        render={({ input, meta }) => {
                                          return (
                                            <FormControlLabel
                                              {...input}
                                              className={
                                                classes.ShareItemFormTag
                                              }
                                              value={tag.title}
                                              control={
                                                <Checkbox
                                                  onChange={tag.onChange}
                                                  name="tagsItem"
                                                />
                                              }
                                              label={
                                                <p
                                                  className={
                                                    classes.ShareItemFormTagLabel
                                                  }
                                                >
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
                                          );
                                        }}
                                      />
                                    );
                                  })}
                                </FormGroup>
                              </FormControl>
                            </div>
                            {/* // */}
                            <Button
                              variant="contained"
                              size="large"
                              color="secondary"
                              disabled={!valid}
                              type="submit"
                            >
                              Share
                            </Button>
                          </form>
                          {loading && <p>Loading...</p>}
                          {error && <p>{error}</p>}
                          {data && <p>Complete!</p>}
                        </Fragment>
                      )}
                    />
                  );
                }}
              </Mutation>
            </Fragment>
          );
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareForm);
