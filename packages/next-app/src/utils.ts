export const hasEthereum = () =>
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";
