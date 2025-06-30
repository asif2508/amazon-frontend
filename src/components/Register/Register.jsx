import axios from "axios";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const {setUser} = useContext(UserContext)
    const nav = useNavigate()

    const handleSubmit = () =>{
        console.log(name, email, password)
        setLoading(true)
        axios.post("http://localhost:5000/api/users/create-user",{name, email, password}).then(res =>{
            if(res?.data?.success){
              setUser(res?.data?.data)
                // alert(res?.data?.message)
                nav('/')
            }else{
                alert(res?.data?.message)
            }
        }).catch(err => alert(err?.response?.data?.message)).finally(() => setLoading(false))
    }
    return (
             <div className=" flex justify-center items-center h-screen">
                    <Card className="min-w-sm max-w-xl">
              <div className="flex flex-col gap-4">
                 <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name1">Your Name</Label>
                  </div>
                  <TextInput value={name} onChange={(e)=>setName(e.target.value)} id="name1" type="text" placeholder="e.g. John Doe" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1">Your email</Label>
                  </div>
                  <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email1" type="email" placeholder="name@flowbite.com" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                  </div>
                  <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password1" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button onClick={handleSubmit}>{loading ? "Loading..." : "Submit"}</Button>
              </div>
                    <p className="text-white">Already have an account?<Link className="text-blue-500" to="/login">Login</Link></p>

            </Card>
                </div>
    );
};

export default Register;