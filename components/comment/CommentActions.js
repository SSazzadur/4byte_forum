import React, { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import { openEdit, fetchThreadDetails } from "../../redux/actions/dataActions";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";

const CommentActions = ({ currentUser, comment }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const handleOpenEdit = () => {
        dispatch(openEdit(comment.comment, comment.comm_id));
        handleClose();
    };

    const handleDeleteComment = async () => {
        try {
            const response = await axios.delete(
                `/api/comments/${comment.comm_id}`
            );

            if (response.data.status === "success") {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));

                dispatch(await fetchThreadDetails(comment.thread_id));
            } else {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
            }
        } catch (error) {
            const data = {
                open: true,
                message: "Something went wrong...",
                variant: "error",
            };
            dispatch(showSnackBar(data));
        }
    };

    return (
        <>
            {currentUser.isAuth && currentUser.data.id === comment.user_id && (
                <>
                    <IconButton onClick={handleClick}>
                        <MoreIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <div>
                            <MenuItem onClick={handleOpenEdit}>
                                <Edit color="primary" /> &nbsp; Edit
                            </MenuItem>
                            <MenuItem onClick={handleDeleteComment}>
                                <Delete color="warning" /> &nbsp; Delete
                            </MenuItem>
                        </div>
                    </Menu>
                </>
            )}
        </>
    );
};

export default CommentActions;
