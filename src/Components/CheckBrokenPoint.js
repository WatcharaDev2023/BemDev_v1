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
import NotStartedIcon from "@mui/icons-material/NotStarted";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import EditIcon from "@mui/icons-material/Edit";
import NiceModal from "@ebay/nice-modal-react";
import Modal from "./Modal";
import Note from "./Note";
import Grid from "@mui/material/Grid";
import "../styles.css";
// const db = new Dexie("BemDatabase");
// db.version(1).stores({
//   myTable:
//     "++id, code, title,line,direction,station_start,station_end,status,line_station",
// });
const noteList = [
  "My awesome third note",
  "My awesome second note",
  "My awesome first note",
];
// const getNoteIndex = (e) =>
//   Array.from(e.target.parentElement.parentNode.children).indexOf(
//     e.target.parentElement
//   );

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

export default function CheckUpdatePoint() {
  const { id, point_id } = useParams();
  const [stationData, setStationData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState(noteList);

  useEffect(() => {
    const fetchData = async () => {
      //const result = await db.myTable.toArray();
      // console.log(result);
      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("myTable", "readwrite");
        const objectStore = transaction.objectStore("myTable");
        const getAllRequest = objectStore.getAll();
        getAllRequest.onsuccess = function (event) {
          const result = event.target.result;
          console.log(result);
          const item = result.find((item) => item.code == id);

          const linestation = item.linestation.find(
            (item) => item.point == point_id
          );
          // console.log(linestation);
          setMainData(item);
          setData(linestation.newdata[0].approved);
          setStationData(linestation.newdata[0].approved.path);
        };
      };
    };
    fetchData();
  }, [id, point_id, request]);

  const showEditModal = (e, key) => {
    // console.log(e)
    // console.log(stationData[getNoteIndex(key)].name)
    // console.log(stationData[getNoteIndex(key)].number)
    // const stationData = stationData.find((item) => item.code == id);
    NiceModal.show(Modal, {
      title: "แก้ไขจำนวน",
      // subtitle: "Rename the Title",
      action: "Save",
      bgColor: "gold",
      note: stationData[key].broken,
    }).then((note) => {
      // console.log(note.number)
      const stationDataArr = [...stationData];
      // const stationData = stationData.find((item) => item.code == id);
      stationDataArr[key].broken = note;
      stationDataArr[key].status = "check";
      setStationData(stationDataArr);
    });
  };
  function getIndex(id) {
    const filter = [...mainData.linestation];
    return filter.findIndex(({ point }) => point == id);
  }
  const SaveBroken = (event) => {
    const DataArr = [...stationData];
    // DataArr[0].approved.path = [...stationData];

    const db = request.result;
    const transaction = db.transaction("myTable", "readwrite");
    const objectStore = transaction.objectStore("myTable");
    const getAllRequest = objectStore.getAll();
    console.log(mainData);
    console.log(stationData);
    console.log(data);
    const subaru = objectStore.get(mainData.id);
    console.log(subaru);
    const point = getIndex(point_id);
    console.log(point);
    console.log(DataArr);
    subaru.onsuccess = function () {
      // subaru.result.title = "เฉลิมหานคร";
      // subaru.result.newdata = "กทม";
      subaru.result.linestation[point].newdata[0].approved.path = DataArr;
      subaru.result.linestation[point].status = 'success';
      objectStore.put(subaru.result);
    };
    window.location = "/checkupdate/" + mainData.code;
  };

  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      <Paper sx={{ p: 2 }}>
        <div>
          <h3>{data.point}</h3>
          <h3>{data.type}</h3>
          <h3>{data.STA}</h3>
          <h3>{data.status}</h3>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left">หมายเลข</TableCell>
                  <TableCell align="left">จำนวนจุดเสียหาย</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stationData.map((station, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{station.name}</TableCell>
                    <TableCell align="left">{station.numberupdate}</TableCell>
                    <TableCell align="left">{station.broken}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        {station.status === "waiting" ? (
                          <Button
                            key={index}
                            note={station}
                            startIcon={<NotStartedIcon />}
                            onClick={(event) => showEditModal(event, index)}
                          >
                            สำรวจ
                          </Button>
                        ) : (
                          <Button
                            key={index}
                            note={station}
                            startIcon={<EditIcon />}
                            onClick={(event) => showEditModal(event, index)}
                          >
                            แก้ไข
                          </Button>
                        )}
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
                onClick={() => SaveBroken(id, point_id)}
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
