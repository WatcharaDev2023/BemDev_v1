// KindaCode.com
// src/App.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dexie from "dexie";
import { MySwitch } from "./MySwitch";
import "./MySwitch.css";
import RadioButtonGroup from "react-custom-radio-buttons-group";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import Grid from "@mui/material/Grid";

const steps = [
  "ตรวจสอบความถูกต้องข้อมูลของสเตชั่น",
  "ตรวจสอบความถูกต้องข้อมูลชิ้นส่วนของสเตชั่น",
  "ยืนยันข้อมูล",
];

// const db = new Dexie("BemDatabase");

// db.version(1).stores({
//   myTable:
//     "++id, code, title,line,direction,station_start,station_end,status,line_station",
// });
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

export default function ValidateData() {
  // state for the first swtich
  const [valueOne, setValueOne] = useState(true);

  // state for the second swtich
  const [valueTwo, setValueTwo] = useState(false);
  const [valueThree, setValueThree] = useState(false);
  const [valueFour, setValueFour] = useState(false);

  const { id, point_id } = useParams();
  const [mainData, setMainData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [dataInfo, setData] = useState("");

  const [value, setValue] = React.useState("female");
  const [type, setType] = useState(dataInfo.type);
  const [line, setLine] = useState("");
  const [STA, setSTA] = useState(dataInfo.STA);
  const [stationSwitch, setStationSwitch] = useState([]);

  const [allInfo, setAllInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const request = indexedDB.open("BemDatabase", 1);
      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("myTable", "readwrite");
        const objectStore = transaction.objectStore("myTable");
        const getAllRequest = objectStore.getAll();

        // const subaru = objectStore.get(5);

        // subaru.onsuccess = function () {
        //   subaru.result.title = "เฉลิมหานคร";
        //   subaru.result.newdata = "กทม";
        //   objectStore.put(subaru.result);
        // };
        // const result =  db;
        // console.log(result);
        //const request = db.toArray();
        getAllRequest.onsuccess = function (event) {
          const result = event.target.result;
          const item = result.find((item) => item.code == id);

          const linestation = item.linestation.find(
            (item) => item.point == point_id
          );
          const updatedPath = linestation.path.map((pathItem) => {
            return { ...pathItem, numberupdate: pathItem.number };
          });
          setMainData(item); //ข้อมูลหลัก
          setData(linestation); //รวมจุดที่ต้องตรวจ
          setStationData(updatedPath); //แต่ละจุดตรวจมีชิ้นส่วนอะไรบ้าง

          setStationSwitch(
            Array.from({ length: linestation.path.length }, () => false)
          );

          setType(linestation.type);
          setLine(item.line);
          setSTA(linestation.STA);

          const dataArr = { old: linestation, approved: linestation };
          setAllInfo(dataArr);
        };
      };
    };
    fetchData();
  }, [id, point_id, request]);

  // this function is called when the first switch is toggled
  const handleChangeStation = (event, index) => {
    // console.log(event.target.value);
    const stationSwitchArr = [...stationSwitch];
    stationSwitchArr[index] = !stationSwitch[index];
    setStationSwitch(stationSwitchArr);
    // event.target.value = !event.target.value;
  };

  const ChangeStation = (event, index) => {
    // console.log(event.target.value);
    const stationDataArr = [...stationData];
    // stationDataArr[index].number = Number(event.target.value);
    stationDataArr[index].numberupdate = Number(event.target.value);
    // console.log(stationDataArr);
    setStationData(stationDataArr);
    // event.target.value = !event.target.value;
  };
  // this function is called when the second switch is toggled
  const handleChangeTwo = () => {
    setValueTwo(!valueTwo);
  };

  // this function is called when the second switch is toggled
  const handleChangeThree = () => {
    setValueThree(!valueThree);
  };

  // this function is called when the second switch is toggled
  const handleChangeFour = () => {
    setValueFour(!valueFour);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    //console.log(stationData);
    // console.log(allInfo);
    // console.log(mainData);
  }, [allInfo, stationSwitch]);

  function getIndex(id) {
    const filter = [...mainData.linestation];
    return filter.findIndex(({ point }) => point == id);
  }

  const changType = (event) => {
    setType(event.target.value);
    setAllInfo((prevAllInfo) => ({
      ...prevAllInfo,
      old: {
        ...prevAllInfo.old,
      },
      approved: {
        ...prevAllInfo.approved,
        type: event.target.value,
      },
    }));

    // setMainData((prevMainData) => {
    //   const updatedLinestation = { ...allInfo };
    //   console.log(updatedLinestation)
    //   const point = getIndex(point_id);
    //   const updatedLinestations = {
    //     ...prevMainData.linestation,
    //     [point]: updatedLinestation,
    //   };

    //   return {
    //     ...prevMainData,
    //     linestation: updatedLinestations,
    //   };
    // });
  };

  // // ตัวอย่างเพิ่มเติม
  // console.log(allInfo.old.type);
  // console.log(allInfo.approved.type);

  const changLine = (event) => {
    setLine(event.target.value);
    console.log(event.target.value);
  };
  const changSTA = (event) => {
    setSTA(event.target.value);
    setAllInfo((prevAllInfo) => ({
      ...prevAllInfo,
      old: {
        ...prevAllInfo.old,
      },
      approved: {
        ...prevAllInfo.approved,
        STA: Number(event.target.value),
      },
    }));
  };
  const CheckBroken = (i,point_id) => {
    window.location = "/checkbrokenpoint/" + id + '/' +point_id;
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    console.log("newSkipped :" + newSkipped);
    console.log("activeStep :" + activeStep);
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      console.log("newSkipped :" + newSkipped);
      newSkipped.delete(activeStep);
      console.log("newSkipped :" + newSkipped);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      const DataArr = [allInfo];
      DataArr[0].approved.path = [...stationData];

      const db = request.result;
      const transaction = db.transaction("myTable", "readwrite");
      const objectStore = transaction.objectStore("myTable");
      const getAllRequest = objectStore.getAll();
      console.log(mainData.id)
      const subaru = objectStore.get(mainData.id);
      console.log(subaru);
      const point = getIndex(point_id);
      console.log(point);
      subaru.onsuccess = function () {
        subaru.result.title = "เฉลิมหานคร";
        subaru.result.newdata = "กทม";
        
        subaru.result.linestation[point].newdata = DataArr;
        objectStore.put(subaru.result);
      };
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Get content based on which step is active
  function getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>ตรวจสอบความถูกต้อง</h2>
            <div className="card">
              <span>จุดที่ :{dataInfo.point}</span>
              {/* <MySwitch value={valueOne} onChange={handleChangeOne} rounded={true} /> */}
            </div>

            <div className="card">
              <span>ประเภทเส้นทาง :{dataInfo.type}</span>
              <MySwitch
                value={valueTwo}
                onChange={handleChangeTwo}
                rounded={true}
              />
            </div>

            <div className="card">
              <span>ชื่อ STA :{dataInfo.STA}</span>
              <MySwitch
                value={valueFour}
                onChange={handleChangeFour}
                rounded={true}
              />
            </div>

            {valueTwo && (
              <div className="secret">
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    ประเภทเส้นทาง
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={type}
                    onChange={changType}
                  >
                    <FormControlLabel
                      value="Main"
                      control={<Radio />}
                      label="MAIN"
                    />
                    <FormControlLabel
                      value="Interchange"
                      control={<Radio />}
                      label="INTERCHANGE"
                    />
                    <FormControlLabel
                      value="Ramp"
                      control={<Radio />}
                      label="RAMP"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}

            {valueFour && (
              <div className="secret">
                <FormLabel id="demo-controlled-radio-buttons-group">
                  ชื่อ STA
                </FormLabel>
                <TextField
                  label="ชื่อ STA"
                  fullWidth
                  value={STA}
                  onChange={changSTA}
                />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <span>ตรวจสอบความถูกต้องข้อมูลชิ้นส่วนของสเตชั่น</span>

            {stationData.map((station, index) => (
              <div className="card" key={index}>
                <span>
                  {station.name} {station.number}
                </span>
                <MySwitch
                  key={index}
                  value={stationSwitch[index]}
                  rounded={true}
                  onChange={(event) => handleChangeStation(event, index)}
                />
              </div>
            ))}

            {stationData.map(
              (station, index) =>
                stationSwitch[index] && (
                  <div className="secret" key={index}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      {station.name}
                    </FormLabel>
                    <TextField
                      label="จำนวน"
                      type="number"
                      fullWidth
                      value={station.numberupdate}
                      onChange={(event) => ChangeStation(event, index)}
                    />
                  </div>
                )
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h2>ยืนยันข้อมูล</h2>
            <div className="card">
              <span>จุดที่ :{dataInfo.point}</span>
              {/* <MySwitch value={valueOne} onChange={handleChangeOne} rounded={true} /> */}
            </div>

            <div className="card">
              <span>ประเภทเส้นทางเดิม : {dataInfo.type} </span>
              <span>ประเภทเส้นทางที่แก้ไข : {type}</span>
            </div>

            <div className="card">
              <span>ชื่อ STA เดิม: {dataInfo.STA} </span>
              <span>ชื่อ STA แก้ไข: {STA}</span>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ชื่อ</TableCell>
                    <TableCell align="left">หมายเลข</TableCell>
                    <TableCell align="left">หมายเลข(แก้ไข)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stationData.map((station, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{station.name}</TableCell>
                      <TableCell align="left">{station.number}</TableCell>
                      <TableCell align="left">{station.numberupdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
    }
  }

  return (
    <div className="container">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Typography sx={{ flex: "1 1 auto" }}>
              <Button
                onClick={() => SavetoCheck()}
                startIcon={<NotStartedIcon />}
              >
                เริ่มทำการตรวจสอบ
              </Button>
            </Typography> */}
            <div className="card">
              <span>จุดที่ :{dataInfo.point}</span>
              {/* <MySwitch value={valueOne} onChange={handleChangeOne} rounded={true} /> */}
            </div>

            <div className="card">
              <span>ประเภทเส้นทาง :{type}</span>
            </div>

            <div className="card">
              <span>ชื่อ STA :{STA}</span>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ชื่อ</TableCell>
                    <TableCell align="left">หมายเลข</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stationData.map((station, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{station.name}</TableCell>
                      <TableCell align="left">{station.numberupdate}</TableCell>
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
                  onClick={() => CheckBroken(id,point_id)}
                  startIcon={<NotStartedIcon />}
                >
                  เริ่มทำการตรวจสอบ
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep + 1)}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
