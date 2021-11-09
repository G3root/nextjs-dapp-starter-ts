import { styled } from "@/stitches.config";

const Button = styled("button", {
  appearance: "none",
  border: "0",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  borderRadius: "9999px",
  lineHeight: 1,
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  userSelect: "none",

  outline: "none",

  textAlign: "center",
  fontSize: "$3",
  height: "$6",
  px: "$3",

  cursor: "pointer",
  variants: {
    color: {
      purple: {
        backgroundColor: "$purple500",
        "&:hover": {
          backgroundColor: "$purple600",
        },
        color: "$loContrast",
      },
      gray: {
        backgroundColor: "$gray500",
        "&:hover": {
          backgroundColor: "$gray600",
          color: "$loContrast",
        },
        color: "$hiContrast",
      },
    },
  },
});
export default Button;
