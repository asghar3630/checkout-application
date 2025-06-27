import { Stack, Typography } from '@mui/material';
export const FormLabelElement = ({ label, value }) => (
    <Stack spacing={1}>
        <Typography align="left" sx={{ fontSize: '13px', fontWeight: 700, color: '#202736' }} noWrap>
            {label}
        </Typography>
        <Typography
            align="left"
            sx={{
                fontSize: '22px',
                fontFamily: 'roboto',
                fontWeight: 500,
                color: '#202736',
                pb: 0.5,
                borderBottom: '1px solid #8C8C8C'
            }}
        >
            {value}
        </Typography>
    </Stack>
);
