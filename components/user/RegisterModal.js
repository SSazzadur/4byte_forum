import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Modal,
    Typography,
    Button,
    Box,
    CircularProgress,
    TextField,
    useMediaQuery,
} from "@mui/material";
import { AppRegistration } from "@mui/icons-material";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import axios from "axios";
import { checkIsFormCompleted } from "../../redux/actions/userActions";

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

export default function RegisterModal({
    openModal,
    handleCloseModal,
    setModalType,
}) {
    const dispatch = useDispatch();
    const { isFormCompleted } = useSelector(state => state.userReducers);

    const isMobile = useMediaQuery("(max-width:600px)");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isSent, setIsSent] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !passwordConfirm) {
            const data = {
                open: true,
                message: "Please fill all the fields...",
                variant: "warning",
            };
            dispatch(showSnackBar(data));
            return;
        }

        if (password !== passwordConfirm) {
            const data = {
                open: true,
                message: "Passwords do not match...",
                variant: "error",
            };
            dispatch(showSnackBar(data));
            return;
        }
        setIsSent(true);
        try {
            const response = await axios.post("/api/user/register", {
                name,
                email,
                password,
            });

            if (response.data.status === "success") {
                const token = `Bearer ${response.data.token}`;
                localStorage.setItem("token", token);

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
        } catch (err) {
            const data = {
                open: true,
                message: "Something went wrong",
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
                    Register here
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
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="standard"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="standard"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="standard"
                        autoComplete="new-password"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                        required
                        fullWidth
                    />

                    <Box sx={{ position: "relative" }}>
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<AppRegistration />}
                            disabled={isSent}
                            onClick={handleRegister}
                            fullWidth
                        >
                            Register
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

                    <Typography variant="caption1">
                        Already have an account?{" "}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setModalType("login")}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
