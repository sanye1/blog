import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import EditorPage from "./pages/editor.pages";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";


export const UserContext = createContext({})

const App = () => {
    const [userAuth, setUserAuth] = useState({ access_token: null })
    useEffect(() => {
        // check if user is already logged in
        let userInSession = lookInSession('user')
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
    }, [])
    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>

            <Routes>
                <Route path="/editor" element={<EditorPage/>} ></Route>
                <Route path="/" element={<Navbar />} >

                    <Route path="/signin" element={<UserAuthForm type='sign-in' />} />
                    <Route path="/signup" element={<UserAuthForm type='sign-up' />} />

                </Route>


            </Routes>
        </UserContext.Provider>


    )
}

export default App;