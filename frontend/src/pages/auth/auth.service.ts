import BaseHttpService from "../../config/http.config";
import type { AxiosResponse } from "axios";
import type { CredentialsType } from "./login/login.pages";
import type { RegisterDataType } from "./register/register.pages";

type UserInterface = {
  name: string;
  email?: string;
  _id?: string;
  role?: string;
};

class AuthService extends BaseHttpService{
    login = async(data: CredentialsType) => {
        try {
            const {data: response} = await this.postRequest(
                import.meta.env.VITE_VERSION+'/login',
                data
            );
            localStorage.setItem('token',response.result.token.acess);
            localStorage.setItem('refresh',response.result.token.refresh);

            return response;
        } catch(exception) {
            throw exception;
        }
    }
    register= async (data: RegisterDataType) =>{
        try{
            const response= await this.postRequest(
                import.meta.env.VITE_VERSION+'/register',data);
            return response
        } catch(exception){
            
            throw exception;
        }
    }

    activateUser = async(token: string) => {
        try{
            const res = await this.getRequest(import.meta.env.VITE_VERSION+'/activate/'+token)
            return res
        }catch(exception){
            throw exception
        }
    }

    resendActivationToken = async(token: string) => {
        try{
            const res = await this.getRequest(import.meta.env.VITE_VERSION+'/re-send/activation/'+token)
            return res
        }catch(exception){
            throw exception
        }
    }

      getLoggedInuser = async (): Promise<AxiosResponse<{ result: UserInterface }>> => {
    try {
      const res = await this.getRequest(
        import.meta.env.VITE_VERSION + "/me",
        { auth: true }
      );
      return res;
    } catch (exception) {
      throw exception;
    }
  };


    
}

const authSvc = new AuthService
export default authSvc