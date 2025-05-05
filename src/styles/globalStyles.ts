import { styled } from "@mui/material/styles";

export const FullWidthTable = styled("div")({
  width: "100% !important",
  "& .MuiTable-root": {
    width: "100% !important",
  },
  "& .MuiTableContainer-root": {
    width: "100% !important",
    maxWidth: "none !important",
  },
});

// For backward compatibility
export const useGlobalStyles = () => {
  return {
    fullWidthTable: FullWidthTable.toString(),
  };
};
