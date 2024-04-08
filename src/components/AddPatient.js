import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { TextField } from "@mui/material";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/list-all-patients/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setRows(data);
        setFilteredRows(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredPatients = rows.filter(
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
    setFilteredRows(filteredPatients);
    setSearched(searchedVal);
  };

  const handleAddPatient = async (username) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/doctor/add-patient/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify({ patient_username: username }), 
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add patient");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <>
      <Paper>
        <TextField
          id="filled-search"
          label="Hasta Ara"
          type="search"
          variant="filled"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Adı</TableCell>
                <TableCell>Soyadı</TableCell>
                <TableCell align="right">Cinsiyet</TableCell>
                <TableCell align="right">Boy(cm)</TableCell>
                <TableCell align="right">Kilo(kg)</TableCell>
                <TableCell align="right">Kan Grubu</TableCell>
                <TableCell align="right">Ekle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.user.first_name}</TableCell>
                  <TableCell>{row.user.last_name}</TableCell>
                  <TableCell align="right">{row.sex}</TableCell>
                  <TableCell align="right">{row.height} cm</TableCell>
                  <TableCell align="right">{row.weight} kg</TableCell>
                  <TableCell align="right">{row.blood_type}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleAddPatient(row.user.username)}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
