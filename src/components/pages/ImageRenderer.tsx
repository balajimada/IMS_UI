import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { FC } from 'react';

interface ImageRendererProps {
    data: {
        productImage: string;
    };
}

const ImageRenderer: FC<ImageRendererProps> = (props) => {
    console.log("props :", props);

    const path: string = getRootPath() + props.data.productImage;

    function getRootPath(): string {
        return "../../Images/Products/";
    }

    return (
        <Stack direction="horizontal" className="h-250">
            <Image rounded src={path} className="h-250 w-100" style={{ height: '50px' }} />
        </Stack>
    );
};

export default ImageRenderer;