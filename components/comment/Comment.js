import React, { Fragment } from "react";

import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from "@mui/material";

const Comment = ({ comment }) => {
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
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default Comment;
