import { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/dashboard/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDoctorData(data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, []);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      {doctorData && (
        <div>
          <h2>Doctor's Name: {doctorData.first_name}</h2>
          <div>
            <p>Speciality: {doctorData.speciality}</p>
            <p>Hospital: {doctorData.hospital}</p>
            <p>Number of Patients: {doctorData.num_patients}</p>
          </div>
        </div>
      )}
      <div>
        <button>My Profile</button>
        <button>My Patients</button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
