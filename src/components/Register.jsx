import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(name, email, password);
        const formData = { name, email, password };

        axios.post('/register', { formData })
            .then((response) => {
                console.log(response)
                if(response.data.status === "Success"){
                    toast.success('Successfully Registered!')
                    navigate('/login')
                } else {
                    toast.error(`${response.data.error}`)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error)
            });
    }

    return (
        <Box sx={{ height: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p className='text-4xl font-semibold text-center mb-5'>Register</p>
            <form onSubmit={handleRegister} action="" className='form-section'>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <TextField
                        required
                        id="filled-required"
                        type='text'
                        label="Your Name"
                        name='name'
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <TextField
                        required
                        id="filled-required"
                        type='email'
                        label="Your Email"
                        name='email'
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        required
                        label="Password"
                        name="password"
                    />
                </FormControl>
                <div className='mt-3'>
                    <Button variant="outlined" type='submit' className='mt-2'>Register</Button>
                </div>
            </form>
            <div className='text-center'>
                <p className='mt-5 mb-5'>Or</p>
                <p className=''>Already have an account? <Link to="/login" className='underline'>Login</Link></p>
            </div>
        </Box>
    );
};

export default Register;