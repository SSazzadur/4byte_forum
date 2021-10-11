import React, { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    InputBase,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
// import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import {
    AccountCircle,
    AddBox,
    AppRegistration,
    Login,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.07),
    },
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1),
        transition: theme.transitions.create("width"),
        width: "10ch",
        "&:focus": {
            width: "15ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "18ch",
            },
        },
    },
}));

const MyProfile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchedValue, setSearchedValue] = useState("");
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}>
            <Toolbar>
                <Typography
                    component="div"
                    variant="h4"
                    sx={{ flexGrow: 1 }}
                    color="seagreen"
                >
                    4BYTe
                </Typography>

                <Search>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        value={searchedValue}
                        onChange={e => setSearchedValue(e.target.value)}
                    />
                    <Button sx={{ width: "12px" }} color="info">
                        <SearchIcon />
                    </Button>
                </Search>

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
                {true ? (
                    <div>
                        <MenuItem>
                            <Login color="info" /> &nbsp; Login
                        </MenuItem>
                        <MenuItem>
                            <AppRegistration color="success" /> &nbsp; Register
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
                                User Name
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <AddBox color="info" /> &nbsp; Add Categories
                        </MenuItem>
                        <MenuItem>
                            <LogoutIcon color="warning" /> &nbsp; Logout
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </Box>
    );
};

export default MyProfile;
