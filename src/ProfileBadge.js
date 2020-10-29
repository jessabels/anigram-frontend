import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import Avatar from "@material-ui/core/Avatar";
import "./ProfileBadge.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfileBadge = () => {
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
          <CreateIcon />
        </div>
        <h1>{user ? `${user}` : ""}</h1>
      </div>
      <h2>{`Today is ${displayDate()}`}</h2>
    </div>
  );
};

export default ProfileBadge;
