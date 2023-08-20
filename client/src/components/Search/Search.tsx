import {
  Avatar,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from "use-debounce";
import "./Search.css";

function Search({ users, userId, onFilterChange, onUserSelected }) {
  const debounceFilter = useDebouncedCallback(onFilterChange, 300);

  return (
    <>
      <div>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="filter">Search...</InputLabel>

          <OutlinedInput
            id="filter"
            label="Search..."
            onChange={(e) => debounceFilter(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className="avatars">
        {users.map((user) => (
          <Tooltip
            key={user.id}
            title={`${
              userId == user.id ? "Stop seeing" : "See"
            } only notes for ${user.firstName}`}
          >
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src={user.avatarUrl}
              onClick={() => onUserSelected(userId == user.id ? 0 : user.id)}
              className={userId && userId != user.id ? "faded" : ""}
            />
          </Tooltip>
        ))}
      </div>
    </>
  );
}
export default Search;
