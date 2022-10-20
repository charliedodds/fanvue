import Comment from "./Comment";
import Post from "./Post";

interface PostWithComments extends Post {
  comments: Comment[];
}

export default PostWithComments;
