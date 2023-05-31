import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import Grid from "@mui/material/Grid";
// const db = new Dexie("BemDatabase");
// db.version(1).stores({
//   myTable:
//     "++id, code, title,line,direction,station_start,station_end,status,line_station",
// });
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    startICon: {
      margin: 0,
    },
  })
);
export default function CheckUpdate() {
  const classes = useStyles();
  const { id } = useParams();
  const [stationData, setStationData] = useState([]);
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const CheckBrokenPoint = (i, point_id) => {
    window.location = "/validatedata/" + id + "/" + point_id;
  };

  useEffect(() => {
    const fetchData = async () => {
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
          setMainData(result);
          const item = result.find((item) => item.code == id);
          console.log(item);
          setData(item);
          setStationData(item.linestation);
        };
      };
    };
    fetchData();
  }, [id]);

  const SaveSuccessAllPath = (event) => {
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
      // getAllRequest.onsuccess = function (event) {
      //   const allData = event.target.result;
      //   const dataIndexes = allData
      //     .filter((item) => item.code === data.code)
      //     .map((item) => item.id);
        
      //   console.log(dataIndexes);
      // };
      console.log(data.id)
      const DataArr = [...mainData];

      const subaru = objectStore.get(data.id);
      console.log(subaru)
      subaru.onsuccess = function () {
        // subaru.result.title = "เฉลิมหานคร";
        // subaru.result.newdata = "กทม";
        subaru.status = "success";
        objectStore.put(subaru.result);
      };
      // window.location = "/listcheck/";
    };
  };
  function getIndex(id) {
    const filter = data;
    return filter.findIndex(({ point }) => point == id);
  }

  return (
    <Container sx={{ p: 2 }} maxWidth="">
      <Paper sx={{ p: 2 }}>
        <div>
          <h3>{data.title}</h3>
          <h3>{data.line}</h3>
          <h3>{data.direction}</h3>
          <h3>{data.station_start}</h3>
          <h3>{data.station_end}</h3>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">จุดที่</TableCell>
                  <TableCell align="left">ปลายทาง</TableCell>
                  <TableCell align="left">STA</TableCell>
                  <TableCell align="left">สถานะ</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stationData.map((station, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{station.point}</TableCell>
                    <TableCell align="left">{station.type}</TableCell>
                    <TableCell align="left">{station.STA}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined success button group"
                      >
                        {station.status === "success" ? (
                          <Button
                            classes={{ startIcon: classes.startICon }}
                            color="success"
                            key={index}
                            note={station}
                            startIcon={<CheckBoxIcon />}
                          >
                            ผ่านการตรวจแล้ว
                          </Button>
                        ) : (
                          <Button
                            color="warning"
                            key={index}
                            note={station}
                            startIcon={<NotStartedIcon />}
                          >
                            รอตรวจ
                          </Button>
                        )}
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          onClick={() =>
                            CheckBrokenPoint(station.code, station.point)
                          }
                          startIcon={<NotStartedIcon />}
                        >
                          เริ่มตรวจ
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "10vh" }}
          >
            <Grid item xs={3}>
              <Button
                variant="outlined"
                onClick={() => SaveSuccessAllPath(id)}
                startIcon={<SaveIcon />}
              >
                บันทึกผลการสำรวจ
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Container>
  );
}
