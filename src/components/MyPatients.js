import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

function PatientInfoTable() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searched, setSearched] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/list-patients/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
    fetchPatients();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredPatients = patients.filter(
      (patient) =>
        patient.user.first_name
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        patient.user.last_name
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        (patient.user.first_name + " " + patient.user.last_name)
          .toLowerCase()
          .includes(searchedVal.toLowerCase())
    );
    setFilteredPatients(filteredPatients);
    setSearched(searchedVal);
  };

  const handleClick = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="search"
          label="Hasta Ara"
          variant="standard"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Yaş</TableCell>
              <TableCell>Cinsiyet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient, index) => (
              <TableRow
                key={patient.user.username}
                onClick={() => handleClick(patient)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    hoveredIndex === index ? "lightgray" : "white",
                }}
              >
                <TableCell>{patient.user.first_name}</TableCell>
                <TableCell>{patient.user.last_name}</TableCell>
                <TableCell>{patient.user.email}</TableCell>
                <TableCell>{patient.age_category}</TableCell>
                <TableCell>{patient.sex}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>
          {selectedPatient &&
            `${selectedPatient.user.first_name} ${selectedPatient.user.last_name}`}
        </DialogTitle>
        <DialogContent dividers>
          {selectedPatient && (
            <div>
              <p>
                <strong>Yaş:</strong> {selectedPatient.age_category}
              </p>
              <p>
                <strong>Alkol Tüketimi:</strong>{" "}
                {selectedPatient.alcohol_consumption}
              </p>
              <p>
                <strong>Alerjiler:</strong> {selectedPatient.allergies || "Yok"}
              </p>
              <p>
                <strong>Artrit:</strong>{" "}
                {selectedPatient.arthritis ? "Evet" : "Hayır"}
              </p>
              <p>
                <strong>Kan Grubu:</strong> {selectedPatient.blood_type}
              </p>
              <p>
                <strong>Vücut Kitle İndeksi:</strong> {selectedPatient.bmi}
              </p>
              <p>
                <strong>Depresyonda mı:</strong>{" "}
                {selectedPatient.depression ? "Evet" : "Hayır"}
              </p>
              <p>
                <strong>Diyabet var mı:</strong>{" "}
                {selectedPatient.diabetes ? "Evet" : "Hayır"}
              </p>
              <p>
                <strong>Egzersiz yapıyor mu:</strong>{" "}
                {selectedPatient.exercise ? "Evet" : "Hayır"}
              </p>
              <p>
                <strong>Boy:</strong> {selectedPatient.height} cm
              </p>
              <p>
                <strong>Cinsiyet:</strong> {selectedPatient.sex}
              </p>
              <p>
                <strong>Sigara Geçmişi Var mı:</strong>{" "}
                {selectedPatient.smoking_history ? "Evet" : "Hayır"}
              </p>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PatientInfoTable;
