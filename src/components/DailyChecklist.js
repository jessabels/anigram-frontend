import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DailyChecklistItem from "./DailyChecklistItem";
import "./DailyChecklist.css";
import MyPosts from "./MyPosts";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fffcd6",
    padding: "30px 38px",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #dddd",
    textAlign: "center",
    height: "665px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
}));

const DailyChecklist = () => {
  const classes = useStyles();
  return (
    <div className="profile-wrapper">
      <Paper className={classes.root}>
        <h3>Daily Checklist</h3>
        <DailyChecklistItem />
      </Paper>

      <MyPosts />
    </div>
  );
};

export default DailyChecklist;
