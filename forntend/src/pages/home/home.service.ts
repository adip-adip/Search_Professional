import type { AxiosResponse } from "axios";
import type { UserInterface } from "./home.pages";
import BaseHttpService from "../../config/http.config";

class UserListService extends BaseHttpService {
     getUserList = async (): Promise<
    AxiosResponse<{ result: UserInterface[] }>
  > => {
    try {
      const res = await this.getRequest(
        import.meta.env.VITE_VERSION + "/list",
        { auth: true }
      );
      return res;
    } catch (exception) {
      throw exception;
    }
  };
}


const userListSvc = new UserListService();
export default userListSvc;