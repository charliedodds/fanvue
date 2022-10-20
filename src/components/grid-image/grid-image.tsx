import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import IImage from "../../config/types/Image";

interface Props {
  image: IImage;
  handleClick: (image: IImage) => void;
}

const GridImage: FC<Props> = ({ image, handleClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        component="article"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button onClick={() => handleClick(image)}>
          <img src={image.thumbnailUrl} alt="" />
        </Button>
      </Box>
    </Grid>
  );
};

export default GridImage;
