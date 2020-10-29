import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

const Like = (props) => {
  const likes = useSelector((state) => state.authentication.likes);

  const handleLike = (postId) => {
    console.log(postId);
  };
  return (
    <FontAwesomeIcon
      onClick={() => handleLike(props.postId)}
      icon={faLeaf}
      style={
        likes && likes.includes(props.postId)
          ? { color: "rgb(74, 165, 50)", cursor: "pointer" }
          : { color: "rgb(74 165 50 / 41%)", cursor: "pointer" }
      }
    ></FontAwesomeIcon>
  );
};

export default Like;
