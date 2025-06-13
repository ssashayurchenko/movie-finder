export const styles = {
  topBar: {
    display: "flex",
    gap: "24px",
  },
  cardsContainer: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: {
      xs: "repeat(1, minmax(264px, 1fr))",
      sm: "repeat(2, minmax(264px, 1fr))",
      md: "repeat(3, minmax(264px, 1fr))",
      lg: "repeat(4, minmax(264px, 1fr))",
    },
    gap: "24px",
    mt: 3,
  },
  cardItem: {
    display: "flex",
    justifyContent: "center",
    mb: "24px",
  },
  noResultsText: {
    mt: "100px",
  },
};
