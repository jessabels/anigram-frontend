import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DailyChecklistItem from "./DailyChecklistItem";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fffcd6",
    padding: "30px 38px",
    width: "100%",
    maxWidth: "500px",
    margin: "250px 30px",
    border: "1px solid #dddd",
    position: "absolute",
    top: " 50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
}));

const DailyChecklist = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <h3>Daily Checklist</h3>
        <DailyChecklistItem />
      </Paper>
    </div>
  );
};

export default DailyChecklist;
