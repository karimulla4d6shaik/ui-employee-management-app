import { LoginSuccess } from "./login-success.model";

export class AppStorage {

    setLocalStorage(loginSucess : LoginSuccess){
        localStorage.setItem("username", loginSucess.userName);
        localStorage.setItem("token", loginSucess.token);
    }

    getToken():any{
       return localStorage.getItem("token");
    }

    getUsername():any{
        return localStorage.getItem("username");
     }

    consoleStorage(value:any){
        console.log(value);
    }
}
