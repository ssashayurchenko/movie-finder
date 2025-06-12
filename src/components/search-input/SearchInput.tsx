import { Box, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInput(newInputValue);
  };
  return (
    <Box>
      <Autocomplete
        freeSolo
        options={[]}
        inputValue={input}
        onInputChange={handleInputChange}
        loading={loading}
        renderInput={(params) => (
          <TextField {...params} label="Search films..." />
        )}
      />
    </Box>
  );
}
