import { styled } from "@/stitches.config";

const Container = styled("div", {
  marginX: "auto",
  paddingX: "$3",

  variants: {
    size: {
      1: {
        maxWidth: "300px",
      },
      2: {
        maxWidth: "585px",
      },
      3: {
        maxWidth: "865px",
      },
    },
  },
});
export default Container;
