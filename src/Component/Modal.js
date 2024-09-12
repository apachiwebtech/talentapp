import { Modal } from "@mui/material";

const CustomModal =({children, open})=>{
    return (
        <Modal open={open}>
            {children}
        </Modal>
    )
}   

export default CustomModal;