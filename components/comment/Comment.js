import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from "@mui/material";

import CommentActions from "./CommentActions";

const Comment = ({ comment }) => {
    const { currentUser } = useSelector(state => state.userReducers);

    return (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.comment}
                    sx={{ color: "steelblue" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                            >
                                Posted by: {comment.user_name}
                            </Typography>
                        </Fragment>
                    }
                />
                <CommentActions currentUser={currentUser} comment={comment} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default Comment;
