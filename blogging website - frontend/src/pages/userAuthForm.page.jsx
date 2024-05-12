import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from '../imgs/google.png'
import AnimationWrapper from "../common/page-animation";
const UserAuthForm = ({ type }) => {
    return (
        <AnimationWrapper keyValue={type}>
        <section className="flex justify-center">
            <form className="flex items-center flex-col justify-center h-cover w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio text-center mb-24 capitalize">{type === 'sign-in' ? 'Welcome Back' : 'Join Us today'}</h1>
                {
                    type !== 'sign-in' ?
                        <InputBox
                            placeholder='full name'
                            name='fullName'
                            type='text'
                            icon='fi-rr-user'
                        /> : ''
                }
                <InputBox
                    placeholder='email'
                    name='email'
                    type='email'
                    icon='fi-rr-envelope'
                />
                <InputBox
                    placeholder='password'
                    name='password'
                    type='password'
                    icon='fi-rr-key'
                />
                <button className="btn-dark mt-10">{type}</button>
                <div className="w-full flex justify-center items-center mt-10 text-black font-bold opacity-10 gap-2 uppercase my-10">
                    <hr className="w-1/2" />
                    <p>or</p>
                    <hr className="w-1/2" />
                </div>
                <button className="btn-dark flex items-center gap-4 justify-center w-[90%] center">
                    <img src={googleIcon} alt="" className="w-5" />
                    continue with google
                </button>
                {
                    type === 'sign-in' ?
                        <p className="mt-6 text-dark-grey text-xl">
                            Dont't have an account?
                            <Link to='/signup' className='underline text-black text-xl ml-1'>
                                Join us today
                            </Link>
                        </p>
                        :
                        <p className="mt-6 text-dark-grey text-xl">
                            Already have an account ?
                            <Link to='/signin' className='underline text-black text-xl ml-1'>
                                Sign in here
                            </Link>
                        </p>
                }
            </form>
        </section>
        </AnimationWrapper>
    )
}
export default UserAuthForm;