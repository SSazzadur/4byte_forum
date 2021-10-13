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
import { Login } from "@mui/icons-material";
import axios from "axios";

export default function LoginModal({
    openModal,
    handleCloseModal,
    setModalType,
}) {
    const dispatch = useDispatch();
    const { isFormCompleted } = useSelector(state => state.userReducers);

    const isMobile = useMediaQuery("(max-width:600px)");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSent, setIsSent] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
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
            const response = await axios.post("/api/user/login", {
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
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: isMobile ? "90%" : "auto",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: isMobile ? 3 : 4,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="teal"
                    sx={{ textAlign: "center", marginBottom: "1rem" }}
                >
                    Login to your account
                </Typography>
                <Box
                    component="form"
                    sx={{
                        width: isMobile ? "100%" : "25rem",
                        borderRadius: "10px",
                        "& > :not(style)": {
                            marginBlock: "0.5rem",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
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

                    <Box sx={{ position: "relative" }}>
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<Login />}
                            disabled={isSent}
                            onClick={handleLogin}
                            fullWidth
                        >
                            Login
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
                        Don't have an account?{" "}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setModalType("register")}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
