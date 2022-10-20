import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post from "../src/components/post";
import { API_URL } from "../src/config/consts";
import PostWithComments from "../src/config/types/PostWithComments";

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  const getPosts = async () => {
    const postsRes = await fetch(API_URL + "posts");
    const postsJson = await postsRes.json();
    setPosts(postsJson);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Fanvue | Posts</title>
      </Head>
      <Container>
        <Grid container>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </Grid>
      </Container>
      ;
    </>
  );
};

export default Feed;

// TODO:
// export async function getStaticProps() {
//   get posts
//   iterate over posts and get comments
//   add comments to post in post array
//   return {
//     props: {
//       posts
//     }
//   }
// }
