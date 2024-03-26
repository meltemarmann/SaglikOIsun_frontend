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

function DoctorInfoTable() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          "http://127.0.0.1:8000/api/patient/list-doctors/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }
    fetchDoctors();
  }, []);

  const handleClick = (doctor) => {
    setSelectedDoctor(doctor);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="doctor table">
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Doğum Tarihi</TableCell>
              <TableCell>Cinsiyet</TableCell>
              <TableCell>Uzmanlık Alanı</TableCell>
              <TableCell>Çalışmaya Başlama Tarihi</TableCell>
              <TableCell>Hastane</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, index) => (
              <TableRow
                key={doctor.user.username}
                onClick={() => handleClick(doctor)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    hoveredIndex === index ? "lightgray" : "white",
                }}
              >
                <TableCell>{doctor.user.first_name}</TableCell>
                <TableCell>{doctor.user.last_name}</TableCell>
                <TableCell>{doctor.user.email}</TableCell>
                <TableCell>
                  {doctor.user.birth_date &&
                    `${doctor.user.birth_date} (${calculateAge(
                      doctor.user.birth_date
                    )})`}
                </TableCell>
                <TableCell>{doctor.user.gender}</TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell>{doctor.start_date}</TableCell>
                <TableCell>{doctor.hospital}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>
          {selectedDoctor &&
            `${selectedDoctor.user.first_name} ${selectedDoctor.user.last_name} Background`}
        </DialogTitle>
        <DialogContent dividers>
          {selectedDoctor && <p>{selectedDoctor.background}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DoctorInfoTable;
