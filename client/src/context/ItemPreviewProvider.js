import React, { createContext, Component } from "react";

export const ItemPreviewContext = createContext();

class ItemPreviewProvider extends Component {
  constructor(props) {
    super(props);
    this.defaultValues = {
      item: {
        title: "Initial title",
        description: "Initial description",
        created: new Date(),
        tags: [],
        imageurl: "https://via.placeholder.com/350"
      }
    };
    this.state = { ...this.defaultValues };
  }

  updatePreview = item => {
    this.setState({ item: { ...this.state.item, ...item } });
  };

  resetPreview = () => {
    this.setState({ ...this.defaultValues });
  };

  render() {
    return (
      <ItemPreviewContext.Provider
        value={{
          state: this.state,
          updatePreview: this.updatePreview,
          resetPreview: this.resetPreview
        }}
      >
        {this.props.children}
      </ItemPreviewContext.Provider>
    );
  }
}

export default ItemPreviewProvider;
