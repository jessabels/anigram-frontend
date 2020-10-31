import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { likePost, unlikePost } from "../store/posts";

const Like = (props) => {
  const likes = useSelector((state) => state.authentication.likes);
  const dispatch = useDispatch();

  const handleLike = (postId) => {
    if (!likes.includes(props.postId)) {
      dispatch(likePost(props.postId));
    } else {
      dispatch(unlikePost(props.postId));
    }
  };
  return (
    <>
      <span style={{ fontSize: ".5em", marginRight: "5px" }}>
        {props.likes}
      </span>
      <FontAwesomeIcon
        onClick={() => handleLike(props.postId)}
        icon={faLeaf}
        style={
          likes && likes.includes(props.postId)
            ? { color: "rgb(74, 165, 50)", cursor: "pointer" }
            : { color: "rgb(74 165 50 / 41%)", cursor: "pointer" }
        }
      ></FontAwesomeIcon>
    </>
  );
};

export default Like;
