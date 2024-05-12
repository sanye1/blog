import { useState } from "react";
const InputBox = ({ type, value, name, id, icon, placeholder, }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div className="relative w-full mb-4">
            <input
                type={type === 'password' ? passwordVisible ? 'text' : 'password' : 'text'}
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                className="input-box"
                defaultValue={value}
            />
            <i className={'fi ' + icon + ' input-icon'}></i>
            {
                type === 'password' ?
                <i className={"fi fi-rr-eye" + (!passwordVisible?"-crossed ":" ") +"input-icon left-auto right-4 cursor-pointer"} onClick={() => setPasswordVisible(!passwordVisible)}></i>
                :''
            }
        </div>
    )
}

export default InputBox;