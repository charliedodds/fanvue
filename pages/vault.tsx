import { Box, Container, Grid, Modal } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../src/config/consts";
import IImage from "../src/config/types/Image";
import GridImage from "../src/components/grid-image";

const Feed: NextPage = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<IImage>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getImages = async () => {
    const imagesRes = await fetch(API_URL + "albums/1/photos");
    const imagesJson = await imagesRes.json();
    setImages(imagesJson);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleClick = useCallback((image: IImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Head>
        <title>Fanvue | Vault</title>
      </Head>
      <Container>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedImage && <img src={selectedImage.url} alt="" />}
          </Box>
        </Modal>
        <Grid container>
          {images.map((image) => {
            return (
              <GridImage
                key={image.id}
                image={image}
                handleClick={handleClick}
              />
            );
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
//   get images

//   return {
//     props: {
//       images
//     }
//   }
// }
