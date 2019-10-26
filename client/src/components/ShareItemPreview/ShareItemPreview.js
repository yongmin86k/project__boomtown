import React from "react";
import ItemCard from "../ItemCard";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { ViewerContext } from "../../context/ViewerProvider";

const ShareItemPreview = () => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <ItemPreviewContext.Consumer>
          {({ state, updatePreview, resetPreview }) => {
            return (
              <ItemCard
                itemInfo={state.item}
                updatePreview={updatePreview}
                resetPreview={resetPreview}
                viewer={viewer}
              />
            );
          }}
        </ItemPreviewContext.Consumer>
      )}
    </ViewerContext.Consumer>
  );
};

export default ShareItemPreview;
