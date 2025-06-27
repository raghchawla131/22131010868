import { useState } from 'react';
import { Box, Button } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';

export default function App() {
  const [view, setView] = useState('shorten');
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Button onClick={() => setView('shorten')} sx={{ mr: 1 }}>Shorten URLs</Button>
        <Button onClick={() => setView('stats')}>View Stats</Button>
      </Box>
      {view === 'shorten' ? <ShortenerForm /> : <StatsPage />}
    </Box>
  );
}
