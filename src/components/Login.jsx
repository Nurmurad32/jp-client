import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
    const { setUser, setLoading } = useContext(UserContext);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log( email, password);
        const formData = { email, password };

        axios.post('/login', { formData })
            .then((response) => {
                console.log(response)
                setUser(response.data);
                if(response.data._id){
                    setLoading(false)
                    toast.success('Successfully Login!')
                    navigate('/')
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
            <p className='text-4xl font-semibold text-center mb-5'>Login</p>
            <form onSubmit={handleLogin} action="" className='form-section'>
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
                    <Button variant="outlined" type='submit' >Login</Button>
                </div>
            </form>
            <div className='text-center'>
                <p className='mt-5 mb-5 '>Email: murad@gmail.com <br /> Pass:1234567</p>
                <p className='mt-5 mb-5 '>Or</p>
                <p className=''>Don't have an account? <Link to="/register" className='underline'>Create an account</Link></p>
            </div>
        </Box>
    );
};

export default Login;