import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { logEvent } from "../logger";
export default function StatsPage() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      const stored = JSON.parse(localStorage.getItem("shortLinks") || "[]");
      const results = [];
      for (let s of stored) {
        try {
          const res = await axios.get(`http://localhost:5000/shorturls/${s}`);
          results.push(res.data);
          logEvent(`Fetched stats for ${s}`);
        } catch (err) {
          logEvent(`Failed to fetch stats for ${s}: ${err.message}`);
        }
      }
      setStats(results);
    };
    fetchStats();
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      {" "}
      <Typography variant="h4" gutterBottom>
        {" "}
        URL Stats{" "}
      </Typography>{" "}
      {stats.map((s, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          {" "}
          <Typography>Short Link: {s.shortLink}</Typography>{" "}
          <Typography>Original URL: {s.originalUrl}</Typography>{" "}
          <Typography>Created: {s.createdAt}</Typography>{" "}
          <Typography>Expires: {s.expiry}</Typography>{" "}
          <Typography>Clicks: {s.clicks.length}</Typography>{" "}
          {s.clicks.map((c, j) => (
            <Box key={j} sx={{ pl: 2 }}>
              {" "}
              <Typography>
                {" "}
                - {c.timestamp} | {c.referrer} | {c.location}{" "}
              </Typography>{" "}
            </Box>
          ))}{" "}
        </Paper>
      ))}{" "}
    </Box>
  );
}
