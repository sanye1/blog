import { Link } from "react-router-dom"
import AnimationWrapper from "../common/page-animation"
import { UserContext } from "../App"
import { useContext } from "react"
import { removeFromSession } from "../common/session"

const UserNavigation = () => {
    const { userAuth:{username},setUserAuth } = useContext(UserContext)
    const signOutUser = ()=>{
        // sign out user
        removeFromSession('user')
        setUserAuth({access_token:null})
    }
    return (
       <AnimationWrapper transition={{ duration: 0.5}} classname='absolute right-0'>
        <div className="bg-white border border-grey w-60 absolute right-0 overflow-hidden duration-200">

            <Link to='/edit' className='flex gap-2 link md:hidden pl-8 py-4'>
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
            </Link>
            <Link to='/drafts' className='flex link gap-2 pl-8 py-4'>
                <i className="fi fi-rr-file-edit"></i>
                <p>Profile</p>
            </Link>
            <Link to='/drafts' className='flex link gap-2 pl-8 py-4'>
                <i className="fi fi-rr-file-edit"></i>
                <p>Dashboard</p>
            </Link>
            <Link to='/drafts' className='flex link gap-2 pl-8 py-4'>
                <i className="fi fi-rr-file-edit"></i>
                <p>Settings</p>
            </Link>
            <span className="absolute border-t border-grey w-[100%]"></span>
            <button onClick={signOutUser} className="hover:bg-grey w-full pl-8 py-4 p-4 text-left">
                <h1 className="font-bold text-xl">Sign Out</h1>
                <p className="text-dark-grey">@{username}</p>
            </button>
        </div>
       </AnimationWrapper>
    )
}
export default UserNavigation