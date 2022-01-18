import { Box } from "@mui/material";
import { FC } from "react";
import { Carousel } from "react-responsive-carousel";

import { baseURL } from "../../../http_comon";

interface ISmallCarousel {
    selectedItem: number,
    images: Array<string>,
    height?: number,
}

const SmallCarousel: FC<ISmallCarousel> = ({ selectedItem, images, height }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Carousel showThumbs={false} selectedItem={selectedItem}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <></>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <></>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return (
                        <></>
                    );
                }}
            >
                {images.map((image) => (
                    <img key={image} alt="" height={height} src={baseURL + image} />
                ))}
            </Carousel>
        </Box>

    )
}
export default SmallCarousel;