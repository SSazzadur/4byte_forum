import Link from "next/link";
import React, { useState } from "react";

import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
// import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import {
    AccountCircle,
    AddBox,
    AppRegistration,
    Login,
} from "@mui/icons-material";
import RegisterModal from "../user/RegisterModal";
import LoginModal from "../user/LoginModal";

import { useDispatch, useSelector } from "react-redux";
import { checkIsFormCompleted } from "../../redux/actions/userActions";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import CategoryModal from "../category/CategoryModal";

const MyProfile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalType, setModalType] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, isFormCompleted } = useSelector(
        state => state.userReducers
    );

    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = type => {
        handleClose();
        setModalType(type);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setModalType("");
        setOpenModal(false);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token");

        dispatch(checkIsFormCompleted(!isFormCompleted));
        const data = {
            open: true,
            message: "Log out succeessful...",
            variant: "success",
        };
        dispatch(showSnackBar(data));
    };

    return (
        <>
            <Box sx={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}>
                <Toolbar>
                    <Typography
                        component="div"
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            userSelect: "none",
                            "&:hover": {
                                textShadow: "0 0 10px rgba(0,0,0,0.15)",
                            },
                        }}
                        color="seagreen"
                    >
                        <Link href="/">
                            <span style={{ cursor: "pointer" }}>4BYTe</span>
                        </Link>
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                        onClick={handleClick}
                    >
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {!currentUser.isAuth ? (
                        <div>
                            <MenuItem onClick={() => handleOpenModal("login")}>
                                <Login color="info" /> &nbsp; Login
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleOpenModal("register")}
                            >
                                <AppRegistration color="success" /> &nbsp;
                                Register
                            </MenuItem>
                        </div>
                    ) : (
                        <div>
                            <MenuItem>
                                <AccountCircle color="primary" /> &nbsp;
                                <Typography
                                    variant="h6"
                                    component="div"
                                    color="primary"
                                >
                                    {currentUser.data.name}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleOpenModal("category")}
                            >
                                <AddBox color="info" /> &nbsp; Add Categories
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon color="warning" /> &nbsp; Logout
                            </MenuItem>
                        </div>
                    )}
                </Menu>
            </Box>
            {modalType === "register" && (
                <RegisterModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    setModalType={setModalType}
                />
            )}
            {modalType === "login" && (
                <LoginModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    setModalType={setModalType}
                />
            )}
            {modalType === "category" && (
                <CategoryModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};

export default MyProfile;
