import { useState, type ChangeEvent, type FormEvent } from "react"
import "./login.css"
import { login } from "../../shared/config/api";
import type { Axios, AxiosResponse } from "axios";import { useNavigate } from "react-router-dom";


function Login() {
    const [formdata, setFormdata] = useState({email : "" , password: ""})
    //const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;


        setFormdata({...formdata, [name]: value })
    }

    const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //setLoading(true);
        login(formdata).then((res : AxiosResponse) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate('/home')
        })
        console.log(formdata)
    }
    return(
        <>
            <div className="loginForm"> 
            <form onSubmit={handelSubmit} action="">
                <input name="email" onChange={handleChange} placeholder="email" value={formdata.email} type="text" />
                <input name="password" onChange={handleChange} placeholder="password" value={formdata.password} type="text" />
                <button type="submit">Submit</button>
                <button className='button' type="submit" onClick={() => window.location.href = '/register'}>Go to Register</button>
            </form>
            </div>
        </>
    )
}


