import { forwardRef, Ref, useContext } from "react";
import { CelebrityFetcherContext } from "../../CelebrityFetcherContext";

import Box from "@mui/material/Box";

// Based on the Virtuoso lib docs
const GridComponents = {
  List: forwardRef(
    (
      {
        style = {},
        children,
        ...props
      }: { style?: React.CSSProperties; children?: React.ReactNode },
      ref: Ref<HTMLDivElement>
    ) => (
      <Box
        ref={ref}
        {...props}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          ...style,
        }}
      >
        {children}
      </Box>
    )
  ),
  Item: ({ children, ...props }: { children?: React.ReactNode }) => (
    <Box {...props}>{children}</Box>
  ),
  Footer: () => {
    const { loading } = useContext(CelebrityFetcherContext);

    if (loading) {
      return (
        <Box
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Loading...
        </Box>
      );
    }

    return null;
  },
};

export default GridComponents;
