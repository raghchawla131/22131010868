import { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import { logEvent } from "../logger";

export default function ShortenerForm() {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const newResults = [];
    for (let u of urls) {
      if (!u.url || !/^https?:\/\/.+\..+/.test(u.url)) {
        alert("Please enter a valid URL");
        return;
      }
      const body = { url: u.url };
      if (u.validity) body.validity = parseInt(u.validity);
      if (u.shortcode) body.shortcode = u.shortcode;

      try {
        const res = await axios.post("http://localhost:5000/shorturls", body);
        newResults.push(res.data);
        logEvent(`Short URL created: ${res.data.shortLink}`);
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || "Unknown error"}`);
      }
    }
    setResults(newResults);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {urls.map((u, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long URL"
                fullWidth
                value={u.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={u.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={u.shortcode}
                onChange={(e) => handleChange(i, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
      {urls.length < 5 && (
        <Button onClick={addUrl} variant="outlined" sx={{ mb: 2 }}>
          Add another URL
        </Button>
      )}
      <Button onClick={handleSubmit} variant="contained">
        Shorten URLs
      </Button>
      {results.map((r, i) => (
        <Box key={i} sx={{ mt: 2 }}>
          <Typography>
            Short Link:{" "}
            <a href={r.shortLink} target="_blank">
              {r.shortLink}
            </a>
          </Typography>
          <Typography>Expires at: {r.expiry}</Typography>
        </Box>
      ))}
    </Box>
  );
}
