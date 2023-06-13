import { Select, MenuItem, Typography } from '@material-ui/core';

interface TodoFilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0}}>
            <Typography variant="h6" style={{ fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>List:</Typography>
            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value as string)}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="To do">To Do</MenuItem>
            </Select>
        </div>
    );
};