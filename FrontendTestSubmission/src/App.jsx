import { useState } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';

export default function App() {
  const [view, setView] = useState('shorten');

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          URL Shortener
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Button
            variant={view === 'shorten' ? 'contained' : 'outlined'}
            onClick={() => setView('shorten')}
          >
            Shorten URLs
          </Button>
          <Button
            variant={view === 'stats' ? 'contained' : 'outlined'}
            onClick={() => setView('stats')}
          >
            View Stats
          </Button>
        </Box>

        <Box>
          {view === 'shorten' ? <ShortenerForm /> : <StatsPage />}
        </Box>
      </Paper>
    </Container>
  );
}
