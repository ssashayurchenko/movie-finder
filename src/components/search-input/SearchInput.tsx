import {
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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

  const handleClose = () => {
    setInput("");
    onSearch("");
  };

  return (
    <TextField
      label="Search.."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!input && <SearchIcon />}
            {input && !loading && (
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
            {loading && input && <CircularProgress size={20} />}
          </InputAdornment>
        ),
      }}
    />
  );
}
