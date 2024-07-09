// import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import React from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useParams, useNavigate } from 'react-router-dom';

// const CreateJob = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [valueDate, setValueDate] = React.useState(dayjs());
//     const [category, setCategory] = React.useState('');

//     const handleChange = (event) => {
//         setCategory(event.target.value);
//     };

//     const handleJobPost = async (e) => {
//         e.preventDefault();

//         const title = e.target.title.value;
//         const cate = category;
//         const salary = e.target.salary.value;
//         const deadline = valueDate;
//         const descriptions = e.target.descriptions.value;

//         const formData = { title, cate, salary, deadline, descriptions };
//         console.log(formData);

//         axios.post('/create', { formData })
//             .then((response) => {
//                 console.log(response)
//                 if(response.data.status === "Success"){
//                     toast.success('Job posted successfully!')
//                     navigate('/')
//                 } else {
//                     toast.error(`${response.data.error}`)
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 toast.error(error)
//             });
//     }

//     return (
//         <Box sx={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//             <p className='text-4xl font-semibold text-center mb-5'>Create a Job</p>
//             <form onSubmit={handleJobPost} action="" className='form-section'>
//                 <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
//                     <TextField
//                         required
//                         id="filled-required"
//                         type='text'
//                         label="Job Title"
//                         name='title'
//                     />
//                 </FormControl>
//                 <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
//                     <InputLabel id="demo-simple-select-label">Category</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={category}
//                         label="Category"
//                         onChange={handleChange}
//                         name='category'
//                     >
//                         <MenuItem value="sales">Sales & Marketing</MenuItem>
//                         <MenuItem value="creative">Creative</MenuItem>
//                         <MenuItem value="human">Human Resource</MenuItem>
//                         <MenuItem value="development">Development</MenuItem>
//                         <MenuItem value="digital">Digital Marketing</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
//                     <TextField
//                         required
//                         id="filled-required"
//                         type='text'
//                         label="Salary"
//                         name='salary'
//                     />
//                 </FormControl>
//                 <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined" >
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DemoContainer components={['DatePicker', 'DatePicker']}>
//                             <DatePicker
//                                 label="Controlled picker"
//                                 value={valueDate}
//                                 onChange={(newValue) => setValueDate(newValue)}
//                                 name="deadline"
//                             />
//                         </DemoContainer>
//                     </LocalizationProvider>
//                 </FormControl>
//                 <FormControl sx={{ m: 1, }} variant="outlined" fullWidth>
//                     <TextField
//                         id="outlined-multiline-static"
//                         label="Job Description"
//                         multiline
//                         name='descriptions'
//                         rows={10}
//                     />
//                 </FormControl>


//                 <div className='mt-3'>
//                     <Button variant="outlined" type='submit' className='mt-2'>Submit</Button>
//                 </div>
//             </form>
//         </Box>
//     );
// };

// export default CreateJob;




import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const CreateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [valueDate, setValueDate] = useState(dayjs());
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        cate: '',
        salary: '',
        deadline: valueDate,
        descriptions: ''
    });

    useEffect(() => {
        if (id) {
            // Fetch job details if editing
            axios.get(`/jobs/${id}`)
                .then(response => {
                    const job = response.data;
                    setFormData({
                        title: job.title,
                        cate: job.cate,
                        salary: job.salary,
                        deadline: dayjs(job.deadline),
                        descriptions: job.descriptions
                    });
                    setCategory(job.cate);
                    setValueDate(dayjs(job.deadline));
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Failed to fetch job details');
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setFormData(prevState => ({
            ...prevState,
            cate: event.target.value
        }));
    };

    const handleDateChange = (newValue) => {
        setValueDate(newValue);
        setFormData(prevState => ({
            ...prevState,
            deadline: newValue
        }));
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            ...formData,
            deadline: formData.deadline.toISOString()
        };

        if (id) {
            // Update job
            axios.patch(`/jobs/${id}`, formDataToSend)
                .then(response => {
                    toast.success('Job updated successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Failed to update job');
                });
        } else {
            // Create new job
            axios.post('/create', formDataToSend)
                .then(response => {
                    if (response.data.status === "Success") {
                        toast.success('Job posted successfully!');
                        navigate('/');
                    } else {
                        toast.error(response.data.error);
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Failed to create job');
                });
        }
    };

    return (
        <Box sx={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p className='text-4xl font-semibold text-center mb-5'>{id ? 'Edit Job' : 'Create a Job'}</p>
            <form onSubmit={handleJobSubmit} action="" className='form-section'>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <TextField
                        required
                        id="filled-required"
                        type='text'
                        label="Job Title"
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                        name='cate'
                    >
                        <MenuItem value="sales">Sales & Marketing</MenuItem>
                        <MenuItem value="creative">Creative</MenuItem>
                        <MenuItem value="human">Human Resource</MenuItem>
                        <MenuItem value="development">Development</MenuItem>
                        <MenuItem value="digital">Digital Marketing</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <TextField
                        required
                        id="filled-required"
                        type='text'
                        label="Salary"
                        name='salary'
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Deadline"
                                value={valueDate}
                                onChange={handleDateChange}
                                name="deadline"
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <TextField
                        id="outlined-multiline-static"
                        label="Job Description"
                        multiline
                        name='descriptions'
                        rows={10}
                        value={formData.descriptions}
                        onChange={handleChange}
                    />
                </FormControl>
                <div className='mt-3'>
                    <Button variant="outlined" type='submit' className='mt-2'>{id ? 'Update Job' : 'Create Job'}</Button>
                </div>
            </form>
        </Box>
    );
};

export default CreateJob;
