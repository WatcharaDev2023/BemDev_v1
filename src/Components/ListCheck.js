import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import CreateIcon from "@material-ui/icons/Create";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import data from "./data.json";
import { useHistory } from "react-router-dom";

export default function ListCheck() {
  const [stationData, setStationData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //const result = await db.myTable.toArray();
  //     // console.log(result);
  //     request.onsuccess = function (event) {
  //       const db = event.target.result;
  //       const transaction = db.transaction("myTable", "readwrite");
  //       const objectStore = transaction.objectStore("myTable");
  //       const getAllRequest = objectStore.getAll();
  //       getAllRequest.onsuccess = function (event) {
  //         const result = event.target.result;
  //         setStationData(result);
  //       };
  //     };
  //   };
  //   fetchData();
  // }, [request]);

  const fetchData = async () => {
    //const result = await db.myTable.toArray();
    // console.log(result);
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("BemDatabase");

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("myTable", "readwrite");
      const objectStore = transaction.objectStore("myTable");
      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
        setStationData(result);
      };
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const CheckUpdate = (id) => {
  //   window.location = "/checkupdate/" + id;
  // };

  // const FetchData = () => {
  //   // db.myTable.bulkPut(data);
  // };

  return (
    <Container sx={{ p: 2 }} maxWidth="">
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => FetchData()}
            >
              Fetch
            </Button> */}
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">รหัส</TableCell>
                <TableCell align="left">โครงการ</TableCell>
                <TableCell align="left">สายทาง</TableCell>
                <TableCell align="left">ทิศทาง</TableCell>
                <TableCell align="left">สเตชั่นเริ่มต้น</TableCell>
                <TableCell align="left">สเตชั่นสุดท้าย</TableCell>
                <TableCell align="center">สถานะ</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stationData.map((station, index) => (
                <TableRow key={station.code}>
                  <TableCell align="left">{station.code}</TableCell>
                  <TableCell align="left">{station.title}</TableCell>
                  <TableCell align="left">{station.line}</TableCell>
                  <TableCell align="left">{station.direction}</TableCell>
                  <TableCell align="left">{station.station_start}</TableCell>
                  <TableCell align="left">{station.station_end}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        color="warning"
                        key={index}
                        note={station}
                        startIcon={<NotStartedIcon />}
                      >
                        รอตรวจ
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      {/* <Button
                        onClick={() => CheckUpdate(station.code)}
                        startIcon={<BorderColorIcon />}
                      >
                        เริ่มตรวจ
                      </Button> */}
                      <Link to={"/checkupdate/" + station.code}>
                        <Button startIcon={<BorderColorIcon />}>
                          เริ่มตรวจ
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
