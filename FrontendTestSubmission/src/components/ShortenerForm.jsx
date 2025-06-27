import { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import { logEvent } from "../logger";

export default function ShortenerForm() {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index][field] = value;
    setUrls(updatedUrls);
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
      <Typography variant="h5" align="center" gutterBottom>
        Shorten Your URLs
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {urls.map((u, i) => (
          <Paper key={i} sx={{ p: 2 }}>
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

        <Box sx={{ display: "flex", gap: 2 }}>
          {urls.length < 5 && (
            <Button variant="outlined" onClick={addUrl}>
              Add another URL
            </Button>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Shorten URLs
          </Button>
        </Box>

        {results.map((r, i) => (
          <Paper key={i} sx={{ p: 2 }}>
            <Typography>
              Short Link:{" "}
              <a href={r.shortLink} target="_blank" rel="noopener noreferrer">
                {r.shortLink}
              </a>
            </Typography>
            <Typography>Expires at: {r.expiry}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
