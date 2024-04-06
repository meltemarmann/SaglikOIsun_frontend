import * as React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default function HeartDiseaseRiskDisplay({ progress }) {
  const calculateHue = (value) => {
    const hue = ((1 - value / 100) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
  };

  const color = calculateHue(progress);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }));
  return (
    <Box sx={{ width: "100%" }}>
      <BorderLinearProgress variant="determinate" value={progress} />
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
            >
            Kalp Krizi Riski: {progress}%
        </Typography>
    </Box>
  );
}
