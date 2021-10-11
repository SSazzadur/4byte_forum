import React, { useState } from "react";

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

export default function LoginModal({
    openModal,
    handleCloseModal,
    setModalType,
}) {
    const isMobile = useMediaQuery("(max-width:600px)");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSent, setIsSent] = useState(false);

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
                    Login to your account
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
