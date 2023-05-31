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
import EditIcon from "@mui/icons-material/Edit";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// const db = new Dexie("BemDatabase");

const initializeDb = indexedDB.open("BemDatabase", 1);
initializeDb.onupgradeneeded = () => {
  const database = initializeDb.result;
  database.createObjectStore("myTable", { keyPath: "id" ,autoIncrement: true});
};
// db.on("blocked", function() {
//   alert ("Database upgrading was blocked by another window. " +
//          "Please close down any other tabs or windows that has this page open");
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

export default function UserList() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [stations, setStations] = useState([]);
  const [state, setState] = React.useState({});

  const [List, setList] = useState([]);
  const [MasterChecked, setMasterChecked] = useState(false);
  const [SelectedList, setSelectedList] = useState([]);

  useEffect(() => {
    stationGet();
  }, []);

  // db.version(1).stores({
  //   items: "++id,fname,lname,username,email,avatar",
  // });

  const stationGet = () => {
    const fetchStation = async () => {
      let url = "http://127.0.0.1:8000/api/posts";

      try {
        const response = await fetch(url);
        const data = await response.json();
        // enter you logic when the fetch is successful
        console.log(data.data);
        const updatedData = data.data.map((pathItem) => {
          return { ...pathItem, selected: false };
        });
        setStations(updatedData);
        setList(updatedData);
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error);
      }
    };
    fetchStation();
  };

  const UpdateStation = (id) => {
    window.location = "/update/" + id;
  };

  const CheckUser = (id) => {
    window.location = "/check/" + id;
  };
  const CheckList = () => {
    window.location = "/listcheck";
  };
  const StationDelete = async (id) => {
    var data = {
      post: id,
    };
    fetch("http://127.0.0.1:8000/api/posts/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        stationGet();
        // if (result["status"] === "ok") {
        //   // UsersGet();
        // }
      });
    // console.log(db.items);
    // await db.items.delete(id);
    // console.log("Item deleted successfully");
    // stationGet()
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     List: Users,
  //     MasterChecked: false,
  //     SelectedList: [],
  //   }
  // }

  // Select/ UnSelect Table rows
  const onMasterCheck = (e) => {
    let tempList = List;
    // Check/ UnCheck All Items
    tempList.map((station) => (station.selected = e.target.checked));

    //Update State
    setMasterChecked(e.target.checked);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected));
    // this.setState({
    //   MasterChecked: e.target.checked,
    //   List: tempList,
    //   SelectedList: this.state.List.filter((e) => e.selected),
    // });
  };

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, item) => {
    console.log(List);
    let tempList = [...List];
    // console.log(tempList);
    // console.log(item);
    tempList.map((station) => {
      if (station.survey_id === item.survey_id) {
        station.selected = e.target.checked;
      }
      return station;
    });

    //To Control Master Checkbox State
    const totalItems = List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    // this.setState({
    //   MasterChecked: totalItems === totalCheckedItems,
    //   List: tempList,
    //   SelectedList: this.state.List.filter((e) => e.selected),
    // });
    setMasterChecked(totalItems === totalCheckedItems);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected));
    console.log(List);
  };
  // Event to get selected rows(Optional)
  const getSelectedRows = () => {
    this.setState({
      SelectedList: List.filter((e) => e.selected),
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    loadData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadData = () => {
    console.log("load");
    // const totalCheckedItems = List.filter((e) => e.selected).length;
    console.log(SelectedList);
  };

  const FetchData = (event) => {
    event.preventDefault();
    const SelectedListArr = [...SelectedList];
    // console.log(SelectedListArr)
    const surveyCode = Object.values(SelectedListArr).map((obj) => obj.code);
    var data = {
      code: surveyCode,
    };
    //console.log(data)
    // await db.items.add({
    //   'fname': fname,
    //   'lname': lname,
    //   'username': username,
    //   'email': email,
    //   'avatar': avatar,
    // })

    fetch("http://127.0.0.1:8000/api/getstationdata", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // Check for duplicates and update or add data accordingly
        const dataToUpdate = result.data;
        // const duplicateCodes = dataToUpdate.map((item) => item.code);
        // const db = new Dexie('BemDatabase')
        // db.version(1).stores({
        //   myTable:
        //     "++id, code, title, line, direction, station_start, station_end, status, line_station",
        // });
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

          // Check for duplicates before using put()
          const duplicateCodes = dataToUpdate.map((item) => item.code); //ตัวใหม่

          getAllRequest.onsuccess = function (event) {
            const existingData = event.target.result; //ที่มีในฐานข้อมูล
            // console.log(existingData);
            dataToUpdate.forEach((newItem) => {
              const existingItem = existingData.find(
                (item) => item.code === newItem.code
              );
              const updatedItem = { ...existingItem, ...newItem };
              if (existingItem) {
                objectStore.delete(existingItem.id);
                objectStore.put(newItem);
              } else {
                // Code does not exist, perform addition
                console.log("not exist");
                objectStore.put(newItem);
              }
              // const updatedItem = { ...existingItem, ...newItem };
              // objectStore.put(updatedItem);
              // Delete existing item
            });
          };
          // 6
          transaction.oncomplete = function () {
            db.close();
          };
          // const db = event.target.result;
          // const transaction = db.transaction("myTable", "readwrite");
          // const objectStore = transaction.objectStore("myTable");
          // const getAllRequest = objectStore.getAll();
          // objectStore.put(dataToUpdate);
          // getAllRequest.onsuccess = function (event) {
          //   const result = event.target.result;
          //   objectStore
          //   .where("code")
          //   .anyOf(duplicateCodes)
          //   .toArray()
          //   .then((existingData) => {
          //     const existingCodes = existingData.map((item) => item.code);
          //     const newData = dataToUpdate.filter(
          //       (item) => !existingCodes.includes(item.code)
          //     );

          //     // Update existing data
          //     existingData.forEach((item) => {
          //       const updatedItem = dataToUpdate.find(
          //         (data) => data.code === item.code
          //       );
          //       objectStore.update(item.id, updatedItem);
          //     });

          //     // Add new data
          //     objectStore.put(newData);
          //   });
          // };
        };
      });
  };

  return (
    <Container sx={{ p: 2 }} maxWidth="">
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการที่ต้องการตรวจสอบ
            </Typography>
          </Box>
          <Box sx={{ m: 0.5 }}>
            <Link to="/create">
              <Button variant="contained" color="primary">
                สร้างรายการ
              </Button>
            </Link>
          </Box>
          <Box sx={{ m: 0.5 }}>
            <Link to="/listcheck">
              <Button variant="contained" color="primary">
                เริ่มตรวจสอบ
              </Button>
            </Link>
          </Box>
          <Box sx={{ m: 0.5 }}>
            <Button
              variant="contained"
              endIcon={<CloudDownloadIcon />}
              onClick={handleClickOpen}
            >
              โหลดข้อมูล
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {" "}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={MasterChecked}
                    id="mastercheck"
                    onChange={(e) => onMasterCheck(e)}
                  />
                </TableCell>
                <TableCell align="right">รหัส</TableCell>
                <TableCell align="center">โครงการ</TableCell>
                <TableCell align="left">สายทาง</TableCell>
                <TableCell align="left">ทิศทาง</TableCell>
                <TableCell align="left">สเตชั่นเริ่มต้น</TableCell>
                <TableCell align="left">สเตชั่นสุดท้าย</TableCell>
                <TableCell align="center">สถานะ</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station, index) => (
                <TableRow
                  key={station.survey_id}
                  className={station.selected ? "selected" : ""}
                >
                  <TableCell align="right">
                    <input
                      type="checkbox"
                      checked={station.selected}
                      className="form-check-input"
                      id="rowcheck{station.survey_id}"
                      onChange={(e) => onItemCheck(e, station)}
                    />
                  </TableCell>

                  <TableCell align="right">{station.survey}</TableCell>
                  <TableCell align="center">{station.project_name}</TableCell>
                  <TableCell align="left">{station.line}</TableCell>
                  <TableCell align="left">{station.direction}</TableCell>
                  <TableCell align="left">{station.station_start}</TableCell>
                  <TableCell align="left">{station.station_end}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      {station.status === "new" ? (
                        <Button
                          classes={{ startIcon: classes.startICon }}
                          key={index}
                          note={station}
                          startIcon={<FiberNewIcon />}
                        >
                          งานใหม่
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
                    <Button
                      onClick={() => UpdateStation(station.survey_id)}
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      onClick={() => StationDelete(station.survey_id)}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"lg"}
          >
            <DialogTitle id="alert-dialog-title">
              {"ดาวน์โหลดข้อมูลตั้งต้นสำหรับงานตรวจสอบ"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ดาวน์โหลดข้อมูลตั้งต้นสำหรับงานตรวจสอบ {SelectedList.length}{" "}
                งานต่อไปนี้ ?
              </DialogContentText>
              {SelectedList.map((station, index) => (
                <DialogContentText
                  id="alert-dialog-slide-description"
                  key={index}
                >
                  JOB ID : {station.code}
                </DialogContentText>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ยกเลิก</Button>
              <Button onClick={(event) => FetchData(event)} autoFocus>
                ตกลง
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Paper>
    </Container>
  );
}
