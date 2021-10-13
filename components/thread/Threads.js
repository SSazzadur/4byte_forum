import { Typography } from "@mui/material";
import React from "react";
import Thread from "./Thread";

const Threads = ({ threads }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography variant="h4" component="div">
                Threads
            </Typography>

            {threads.length === 0 && (
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="teal"
                >
                    Be the first one to start a thread!
                </Typography>
            )}

            {threads.map(thread => (
                <Thread key={thread.thread_id} thread={thread} />
            ))}
        </div>
    );
};

export default Threads;
