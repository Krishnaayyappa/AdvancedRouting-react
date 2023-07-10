import { redirect, json } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    console.log("checkpointo")
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
    console.log("checkpoint1")
    const data = await request.formData();
    const email = data.get("email")
    const password = data.get("password")
    const userDetails = {
        email:email,
        password:password
    };
    
    const param = new URL(request.url).searchParams
    const mode = param.get("mode") || 'login';
    

    if (mode !== 'login' && mode!=='signup'){
        throw json({message:'unsupported mode'}, {status:422});
    }
    
    const response = await fetch("http://localhost:8080/" + mode, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userDetails)
    });

    
    if(response.status === 422 || response.status === 401){
        return response;
    }

    if(!response.ok){
        throw json({message: "could not authenticate user."}, {status:500});
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);

    // registering the time the token was created
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect("/")
}