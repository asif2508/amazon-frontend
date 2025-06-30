import axios from "axios";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext)
      const nav = useNavigate()
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/signin", { email, password })
      .then((res) => {
        console.log(res)
        if (res?.data?.success) {
          // alert(res?.data?.message);
          console.log(res?.data?.data)
          setUser(res?.data?.data?.user)
          localStorage.setItem("token", res?.data?.data?.token)
          nav('/')
        } else {
          alert(res?.data?.message);
        }
      })
      .catch((err) => alert(err?.response?.data?.message))
      .finally(() => setLoading(false));
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <Card className="min-w-sm max-w-xl">
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email</Label>
            </div>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password</Label>
            </div>
            <TextInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password1"
              type="password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button disabled={loading} onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</Button>
        </div>
        <p className="text-white">
          Don't have an account?
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
