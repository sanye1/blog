import logo from "../imgs/logo.png"
import { Link,Outlet} from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import UserNavigation from "./user-navigation.component";

const Navbar = () => {
    const {userAuth,userAuth:{access_token,profile_img}} = useContext(UserContext);

    const [userNavpanel, setUserNavpanel] = useState(false);
    const [searchBoxVisible, setSearchBoxVisible] = useState(false);

    const handleUserNavpanel = () => {
        setUserNavpanel(!userNavpanel);
    }
    const handleBlur = () => {
        setTimeout(() => {
            setUserNavpanel(false)
        },200)
    }
    return (
        
        <>  
        <nav className="navbar">
            <Link to='/' className="flex-none w-10">
                <img src={logo} className="w-full" alt="logo" />
            </Link>
            <div className={"absolute top-full md:inset-0 md:border-0 md border-b w-full md:p-0 bg-white left-0 md:block  border-grey py-4 mt-0.5 px-[5vw] md:relative md:w-auto md:px-0 md:py-0 md:mt-0 md:show" + (searchBoxVisible ? " show" : " hidden")}>
                <input type="text" placeholder="Search" className="w-full p-4 pl-6 pr-[12%]  rounded-full bg-grey md:pr-6 md:pl-12 placeholder:text-dark-grey" />
                <i className="fi fi-rr-search absolute md:left-5 top-1/2 -translate-y-1/2  right-[10%] "></i>
            </div>
            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <button onClick={() => setSearchBoxVisible(!searchBoxVisible)} className="bg-grey rounded-full w-12 h-12 md:hidden justify-center items-center flex">
                    <i className="fi fi-rr-search text-xl"></i>
                </button>
                <Link to="/editor" className="hidden md:flex gap-2 link"  >
                    <i className="fi fi-rr-file-edit"></i>
                    <p>write</p>
                </Link>
                {
                access_token? 
                    <>
                        <Link to='/dasboard'>
                            <button className="w-12 h-12 relative bg-grey hover:bg-black/10 rounded-full flex justify-center items-center">
                                <i className="fi fi-rr-bell text-2xl mt-1"></i>
                            </button>
                        </Link>
                        <div className="relative" onClick={handleUserNavpanel} onBlur={handleBlur}>
                            <button className="w-12 h-12 mt-1">
                                <img src={profile_img} className="rounded-full w-full h-full object-cover" alt="" />
                            </button>
                            {userNavpanel? <UserNavigation/> :''}
                        </div>
                    </>
                :
                <>
                <Link to="/signin" className="btn-dark py-2">Sign in</Link>
                <Link to="/signup" className="btn-light py-2 hidden md:block">Sign up</Link>
                </>

                }

            </div>
        </nav>
        <Outlet />
        </>
    )
}
export default Navbar;