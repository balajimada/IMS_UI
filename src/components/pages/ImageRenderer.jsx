import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

const ImageRenderer = (props) => {
    console.log("props :", props);

    const path = getRootPath() + props.data.productImage;

    function getRootPath() {
        return "../../Images/Products/";
        //return 
    }

    return (
        <Stack direction="horizontal" className="h-250">
            <Image rounded src={getRootPath() + props.data.productImage} className="h-250 w-100" style={{height:'50px;'}} />
        </Stack>
    );
};

export default ImageRenderer;