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
import EditIcon from '@mui/icons-material/Edit';

const db = new Dexie("BemDatabase");
db.version(1).stores({
  myTable:
    "++id, code, title,line,direction,station_start,station_end,status,line_station",
});

export default function CheckUpdatePointCopy() {
  const { id, point_id} = useParams();
  const [stationData, setStationData] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await db.myTable.toArray();
      console.log(result);
      const item = result.find((item) => item.code == id);

      const linestation = item.linestation.find((item) => item.point == point_id);
      console.log(linestation);
      setData(linestation);
      setStationData(linestation.path);
    };
    fetchData();
    
  }, [id,point_id]);

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
                <TableCell align="left">จำนวน</TableCell>
                <TableCell align="left">สถานะ</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stationData.map((station, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{station.name}</TableCell>
                  <TableCell align="left">{station.number}</TableCell>
                  <TableCell align="left">{station.status}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        startIcon={<CheckBoxIcon />}
                      >
                        
                      </Button>
                      <Button
                        startIcon={<EditIcon />}
                      >
                        
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     
    </div>
    </Paper>
    </Container>
  );
}
