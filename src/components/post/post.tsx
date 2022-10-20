import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { API_URL } from "../../config/consts";
import Comment from "../../config/types/Comment";
import Post from "../../config/types/Post";

interface Props {
  post: Post;
}

const Post: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isShowingComments, setIsShowingComments] = useState<Boolean>(false);
  const getComments = useCallback(async (id: number) => {
    const commentsRes = await fetch(API_URL + `posts/${id}/comments`);
    const commentsJson = await commentsRes.json();
    setComments(commentsJson);
  }, []);
  useEffect(() => {
    getComments(post.id);
  }, [post.id, getComments]);
  const toggleComments = useCallback(() => {
    setIsShowingComments((prevState) => !prevState);
  }, []);
  return (
    <Grid item key={post.id}>
      <Box component="article">
        <Typography variant="h4" component="h2">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {post.body}
        </Typography>
        {comments.length > 0 && (
          <Button onClick={toggleComments}>Comments ({comments.length})</Button>
        )}
        {isShowingComments && (
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <Typography variant="body1">{comment.body}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Grid>
  );
};

export default Post;
