import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import toast from 'react-hot-toast';
import JobModal from './JobModal';
import { Link } from 'react-router-dom';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const extractUniqueCategories = (jobs) => {
        const categories = jobs?.map(job => job.cate);
        return [...new Set(categories)];
    };

    useEffect(() => {
        axios.get('/jobs')
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }, []);

    useEffect(() => {
        const uniqueCategories = extractUniqueCategories(jobs);
        setCategory(uniqueCategories);
    }, [jobs]);

    const handleOpen = (job) => {
        setSelectedJob(job);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedJob(null);
    };


    return (
        <div className='accordion'>
            <Typography variant='h4' className='text-center'>BROWSE OPEN POSITIONS BY CATEGORY</Typography>
            <p className='mb-5 text-center'>We are always on the lookout for talented people</p>
            {
                category?.map(cat => (
                    <Accordion key={cat} className='mb-5' >
                        <AccordionSummary
                            expandIcon={<AddIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>
                                {
                                    cat === "human" ? "Human Resource"
                                        : cat === "development" ? "Development"
                                            : cat === "creative" ? "Creative"
                                                : cat === "digital" ? "Digital Marketing"
                                                    : cat === "sales" ? "Sales & Marketing"
                                                        : " "
                                }
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {jobs?.filter(job => job.cate === cat).map(job => (
                                    <div key={job._id} onClick={() => handleOpen(job)} style={{ cursor: 'pointer' }} className='p-3 mb-2 bg-slate-300'>
                                        {job.title}
                                    </div>
                                ))}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            {selectedJob && (
                <JobModal
                    open={open}
                    handleClose={handleClose}
                    job={selectedJob}
                    setJobs={setJobs}
                    jobs={jobs}
                />
            )}
        </div>
    );
};

export default Home;
