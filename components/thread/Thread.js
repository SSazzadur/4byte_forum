import Link from "next/link";
import React, { Fragment } from "react";

import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    ListItemButton,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

const Thread = ({ thread }) => {
    return (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <Link
                    href="/threads/[thread_id]"
                    as={`/threads/${thread.thread_id}`}
                >
                    <ListItemButton>
                        <ListItemText
                            primary={thread.thread_title}
                            sx={{ color: "steelblue" }}
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                    >
                                        Asked by: {thread.user_name}
                                    </Typography>
                                </Fragment>
                            }
                        />
                        <KeyboardArrowRight fontSize="large" color="info" />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default Thread;
