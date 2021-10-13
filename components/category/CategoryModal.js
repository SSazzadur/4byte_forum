import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import { checkIsFormCompleted } from "../../redux/actions/userActions";

import {
    Modal,
    Typography,
    Button,
    Box,
    CircularProgress,
    TextField,
    useMediaQuery,
} from "@mui/material";
import { Done, Login } from "@mui/icons-material";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const CategoryModal = ({ openModal, handleCloseModal, setModalType }) => {
    const dispatch = useDispatch();
    const { currentUser, isFormCompleted } = useSelector(
        state => state.userReducers
    );

    const isMobile = useMediaQuery("(max-width:600px)");

    const [catName, setCatTitle] = useState("");
    const [catDesc, setCatDesc] = useState("");

    const [isSent, setIsSent] = useState(false);

    const handleAddCategory = async () => {
        if (!catName || !catDesc) {
            const data = {
                open: true,
                message: "Please fill all the fields...",
                variant: "warning",
            };
            dispatch(showSnackBar(data));
            return;
        }

        setIsSent(true);

        try {
            const response = await axios.post("/api/categories", {
                catName,
                catDesc,
                userId: currentUser.data.id,
            });

            if (response.data.status === "success") {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);

                dispatch(checkIsFormCompleted(!isFormCompleted));
                handleCloseModal();
            } else {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);
            }
        } catch (error) {
            const data = {
                open: true,
                message: "Something went wrong...",
                variant: "error",
            };
            dispatch(showSnackBar(data));
            setIsSent(false);
        }
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="teal"
                    sx={{ textAlign: "center", marginBottom: "1rem" }}
                >
                    Add Categories
                </Typography>
                <Box
                    component="form"
                    sx={{
                        width: isMobile ? "100%" : "25rem",
                        padding: "1rem 2rem",
                        borderRadius: "10px",
                        boxShadow: "0 0 25px rgba(0,0,0,0.1)",
                        "& > :not(style)": {
                            marginBlock: "0.5rem",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Category Title"
                        type="text"
                        variant="standard"
                        value={catName}
                        onChange={e => setCatTitle(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Category Description"
                        type="text"
                        variant="standard"
                        value={catDesc}
                        onChange={e => setCatDesc(e.target.value)}
                        rows={3}
                        multiline
                        required
                        fullWidth
                    />

                    <Box sx={{ position: "relative" }}>
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<Done />}
                            disabled={isSent}
                            onClick={handleAddCategory}
                            fullWidth
                        >
                            Submit
                        </Button>
                        {isSent && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "green",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default CategoryModal;
