import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HeartDiseaseRiskDisplay from "./HeartDiseaseRiskDisplay";

export default function FetchHeartDiseaseButton() {
  const [loading, setLoading] = React.useState(false);
  const [prediction, setPrediction] = React.useState(null);

  function handleClick() {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/api/predict-heart-disease/", {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPrediction(data.prediction);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Box sx={{ "& > button": { m: 1 } }}>
        <LoadingButton
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<HeartBrokenIcon />}
          variant="contained"
          size="large"
          sx={{
            minWidth: '200px', 
            minHeight: '60px', 
            fontSize: '1.2rem', 
          }}
        >
          <span>Risk Hesapla (Kalp) </span>
        </LoadingButton>
      </Box>
      {prediction !== null && (
          <HeartDiseaseRiskDisplay progress={prediction * 100} />
      )}
    </div>
  );
}
