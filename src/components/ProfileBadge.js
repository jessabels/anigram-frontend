import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import Avatar from "@material-ui/core/Avatar";

import "./ProfileBadge.css";
import AvatarForm from "./AvatarForm";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfileBadge = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayDate = () => {
    const date = new Date().toDateString();
    return date;
  };
  const user = useSelector((state) => state.authentication.username);
  const avatarUrl = useSelector((state) => state.authentication.avatar);
  const classes = useStyles();
  return (
    <div className="profileBadge">
      <div className="userInfo">
        <div className="avatar-edit">
          <Avatar src={avatarUrl} className={classes.large} />
          <CreateIcon style={{ cursor: "pointer" }} onClick={handleClickOpen} />
        </div>
        <h1>{user ? `${user}` : ""}</h1>
      </div>
      <h2>{displayDate()}</h2>
      <AvatarForm open={open} onClose={handleClose}></AvatarForm>
    </div>
  );
};

export default ProfileBadge;
