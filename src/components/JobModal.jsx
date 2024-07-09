import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const JobModal = ({ open, handleClose, job, setJobs, jobs }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/job/edit/${job._id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/jobs/${job?._id}`);
            toast.success('Job deleted successfully');
            const rest = jobs?.filter(jb => jb?._id !== job?._id)
            setJobs(rest);
            handleClose(); // Close the modal after deletion
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete job');
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display: "flex", justifyContent: "space-between"}}>
                    <p>{job?.title}</p>
                    <p>
                        <EditNoteIcon onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <DeleteOutlineIcon onClick={handleDelete} sx={{ color: "red", cursor: 'pointer' }} />
                    </p>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <strong>Category:</strong> {job?.cate} <br />
                    <strong>Salary:</strong> {job?.salary} <br />
                    <strong>Deadline:</strong> {new Date(job?.deadline).toLocaleDateString()} <br />
                    <strong>Descriptions:</strong><br />
                </Typography>
                <Typography className='overflow-hidden flex flex-wrap'><p>{job?.descriptions}</p></Typography>
            </Box>
        </Modal>
    );
};

export default JobModal;
