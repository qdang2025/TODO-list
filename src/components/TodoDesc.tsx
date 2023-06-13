import { Typography } from '@mui/material';

interface TodoDescProps {
    description: string;
}

export const TodoDesc: React.FC<TodoDescProps> = ({ description }) => {
    return (
        <Typography variant="h3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {description}
        </Typography>
    );
};