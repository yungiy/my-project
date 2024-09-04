import { Box, Container } from '@mui/material';
import Calendar from './components/Calendar';

export default function Home() {
  return (
    <Container>
      <Box>
        <Calendar />
      </Box>
    </Container>
  );
}
