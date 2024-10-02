import { Form, Link, redirect, useActionData, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: '' };
    if (data.password.length < 3) {
      errors.msg = 'password too short';
      return errors;
    }
    try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
    } catch (error) {
    error.msg = error.response.data.msg;
    return error;
    }
};

const Login = () => {
    const navigate = useNavigate()

    const loginDemoUser = async()=>{
        const data = {
            email:'test@test.com',
            password:'secret123'
        }
    try{
        await customFetch.post('/auth/login', data)
        navigate('/dashboard')
    }catch(error){
            error.msg = error.response.data.msg;
            return error;
            }
    }
    return (
        <Wrapper>
            <Form method = 'post' className='form'>
                <Logo/>
                <h4>login</h4>
                <FormRow type="email" name="email"/>
                <FormRow type="password" name="password"/>
                <SubmitBtn formBtn />
                <button type='submit' className='btn btn-block' onClick={loginDemoUser}>
                    Explore
                </button>
                <p>
                    Not a Member Yet?
                    <Link to='/register' className='member-btn'>
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
        )
}

export default Login
