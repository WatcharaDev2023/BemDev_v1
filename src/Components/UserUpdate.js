import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
const db = new Dexie("UsersList");
db.version(1).stores({
  items: "++id,fname,lname,username,email,avatar",
});
export default function UserUpdate() {
  const { id } = useParams();
  const [survey_type, setSurveyType] = useState('');
  const [project_name, setProjectName] = useState('');
  const [line, setLine] = useState('');
  const [direction, setDirection] = useState('');
  const [station_start, setStationStart] = useState('');
  const [station_end, setStationEnd] = useState('');
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          setSurveyType(result.data.survey_type)
          setProjectName(result.data.project_name)
          setLine(result.data.line)
          setDirection(result.data.direction)
          setStationStart(result.data.station_start)
          setStationEnd(result.data.station_end)
        }
      ).catch(error => {console.log("ERROR FROM THE BACKEND", error);})

  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = {
      'survey_type': survey_type,
      'project_name': project_name,
      'line': line,
      'direction': direction,
      'station_start': station_start,
      'station_end': station_end,
    }
    fetch("http://127.0.0.1:8000/api/posts/"+id, {
      method: "PUT",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        alert(result["message"]);
        window.location.href = "/";
        if (result["status"] === "ok") {
          window.location.href = "/";
        }
      });
  
  };


  return (
    <Container sx={{ p:2 }} maxWidth="lg">    
      <div>
        <Typography component="h1" variant="h5">
          แก้ไขงานตรวจสอบ
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt:2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="survey_type"
                name="survey_type"
                variant="outlined"
                required
                fullWidth
                id="survey_type"
                label="ประเภทงานตรวจสอบ"
                value={survey_type}
                onChange={(e) => setSurveyType(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="project_name"
                label="โครงการ"
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="line"
                label="สายทาง"
                value={line}
                onChange={(e) => setLine(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="direction"
                label="ทิศทาง"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="station_start"
                label="สเตชั่นเริ่มต้น"
                value={station_start}
                onChange={(e) => setStationStart(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="station_end"
                label="สเตชั่นสุดท้าย"
                value={station_end}
                onChange={(e) => setStationEnd(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
