import { FormRow,SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async({request})=>{
    const formData = await request.formData()
    const file = formData.get('avatar')
    // if(file && file.size > 500000){
    //     toast.error('Image size too large')
    //     return null
    // }
    try{
        await customFetch.patch('/users/update-user', formData)
        toast.success('Profile updated successfully')
        return redirect('/dashboard/all-jobs')
    }catch(error){
        toast.error(error?.response?.data?.msg);
        console.log(error)
    }
}

const Profile = () => {
    const user = useOutletContext()
    return <Wrapper>
        <Form method='post' className='form' encType='multipart/form-data'>
            <h4 className='form-title'>profile</h4>
            <div className="form-center">
                <div className="form-row">
                    <label htmlFor="avatar" className='form-label'>
                        Select an image file (max 0.5 MB)
                    </label>
                    <input type="file" id='avatar' name='avatar' className='form-input' accept='image/*'/>
                </div>
                {/* file input */}
                <FormRow type='text' name='name' defaultValue={name}></FormRow>
                <FormRow type='text' name='lastName' labelText='lastName' defaultValue={user.lastName}></FormRow>
                <FormRow type='email' name='email' defaultValue={user.email}></FormRow>
                <FormRow type='text' name='location' defaultValue={location}></FormRow>
                <SubmitBtn formBtn/>
            </div>
        </Form>
    </Wrapper>
}

export default Profile
