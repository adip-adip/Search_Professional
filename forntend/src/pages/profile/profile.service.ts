import BaseHttpService from "../../config/http.config";
import type { UserInterface } from "../home/home.pages";

class ProfileService extends BaseHttpService {
  update = async (id: string, data: Partial<UserInterface>) => {
    try {
      const response = await this.patchRequest(
        import.meta.env.VITE_VERSION + `/update/${id}`,
        data,
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserById = async (id: string) => {
    try {
      const response = await this.getRequest(
        import.meta.env.VITE_VERSION + `/${id}`,
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  addExperience = async (data: any) => {
    try {
      const response = await this.postRequest(
        import.meta.env.VITE_VERSION + `/experience`,
        data,
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };


  getUserExperiences = async (userId: string) => {
    try {
      const response = await this.getRequest(
        import.meta.env.VITE_VERSION + `/experience/${userId}`,
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };

}



// addExperience(data: any) {
//     return this.postRequest("/experience", data);
//   }

//   getUserExperiences(userId: string) {
//     return this.getRequest(`/experience/${userId}`);
//   }
// }


const profileSvc = new ProfileService()
export default profileSvc;

