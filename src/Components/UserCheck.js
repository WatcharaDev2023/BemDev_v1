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

export default function UserCheck() {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await db.items.toArray();
      console.log(result);
      const item = result.find((item) => item.id == id);
      if (item) {
        setFname(item.fname);
        setLname(item.lname);
        setUsername(item.username);
        setEmail(item.email);
        setAvatar(item.avatar);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    var data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: avatar,
    };
    // fetch("https://www.melivecode.com/api/users/update", {
    //   method: "PUT",
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
    //       window.location.href = "/";
    //     }
    //   });
    // console.log(id)
    // console.log(data)
    // event.preventDefault();
    // var data = {
    //   id: id,
    //   fname: fname,
    //   lname: lname,
    //   username: username,
    //   email: email,
    //   avatar: avatar,
    // };
    // console.log(id);
    // console.log(data);
    // const result = await db.items.update(id, data);
    // const result = await db.items.toArray();
    // const item = result.find((item) => item.id == id);
    // await db.items.update(id, data).then((res) => {
    //   console.log(res); // จะส่งคืนจำนวนเรคคอร์ดที่อัพเดตได้ (0 หรือ 1)
    //   if (res) {
    //     alert("Update successful.");
    //     window.location.href = "/";
    //   } else {
    //     alert("Update failed.");
    //   }
    // });

    event.preventDefault();
    const itemId = Number(id);
    // await id;
    console.log(itemId);
    await db.items.update(itemId, data).then(function (updated) {
      if (updated) {
        alert("Update successful.");
        window.location.href = "/";
      } else {
        alert("Update failed.");
      }
    });

    // window.location.href = "/";
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt: 2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
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
