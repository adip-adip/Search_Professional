import BaseHttpService from "../../config/http.config";
import type { UserInterface } from "../home/home.pages";

class ProfileService extends BaseHttpService{
    update = async (id: string, data: Partial<UserInterface>) => {
    try {
      const response = await this.patchRequest(
        import.meta.env.VITE_VERSION+`/update/${id}`,
        data,
        {auth: true}
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

const profileSvc = new ProfileService()
export default profileSvc;

