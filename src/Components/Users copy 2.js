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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
const db = new Dexie("UsersList");


db.version(1).stores({
  items: "++id,fname,lname,username,email,avatar",
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function UserList() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  useEffect(() => { 
    UsersGet()
  }, []);
 
  const UsersGet = () => {
    const fetchUsers = async () => {
      // console.log(db.items.toArray());
      const items = await db.items.toArray();
      
      // console.log(items)
      setUsers(items);
    };
    fetchUsers();
  }
  // db.version(1).stores({
  //   items: "++id,fname,lname,username,email,avatar",
  // });
  // const UsersGet =  useLiveQuery(() => {
  //   // fetch("https://www.melivecode.com/api/users")
  //   //   .then((res) => res.json())
  //   //   .then((result) => {
  //   //     setUsers(result);
  //   //   });
  //  db.items.toArray()
  //   .then((res) => res.json())
  //   .then((result) => {
  //        setUsers(result);
  //        console.log(result);
  //      });
    

  //   // setUsers(items);
  // });

  const UpdateUser = (id) => {
    window.location = "/update/" + id;
  };

  const CheckUser = (id) => {
    window.location = "/check/" + id;
  };
  const CheckList = (id) => {
    window.location = "/listcheck";
  };
  const UserDelete = async  (id) => {
    // var data = {
    //   id: id,
    // };
    // fetch("https://www.melivecode.com/api/users/delete", {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/form-data",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     alert(result["message"]);
    //     if (result["status"] === "ok") {
    //       // UsersGet();
    //     }
    //   });
    // console.log(db.items);
    await db.items.delete(id);
    console.log('Item deleted successfully');
    UsersGet()
  };

  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              USERS
            </Typography>
          </Box>
          <Box>
            <Link to="/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box>
          <Box>
            <Link to="/listcheck">
              <Button variant="contained" color="primary">
                CHECK
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="left">First</TableCell>
                <TableCell align="left">Last</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={user.avatar} />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{user.fname}</TableCell>
                  <TableCell align="left">{user.lname}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        onClick={() => UpdateUser(user.id)}
                        className={classes.button}
                        startIcon={<CreateIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => UserDelete(user.id)}
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                      >
                        Del
                      </Button>
                      <Button
                        onClick={() => CheckUser(user.id)}
                        className={classes.button}
                        startIcon={<CheckBoxIcon />}
                      >
                        Check
                      </Button>
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
