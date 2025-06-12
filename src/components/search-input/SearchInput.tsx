import { TextField, CircularProgress, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchInput({ onSearch }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      onSearch(input);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <TextField
      label="Search films..."
      fullWidth
      value={input}
      onChange={(e) => setInput(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {loading ? <CircularProgress size={20} /> : <SearchIcon />}
          </InputAdornment>
        ),
      }}
    />
  );
}
