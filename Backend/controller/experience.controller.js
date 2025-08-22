import ExperienceModel from "../modules/expericence.model.js";

class ExperienceController {
    addExperience = async (req, res, next) => {
        try {
            const data = req.body;
            const userId = req.user._id; // Get user ID from the authenticated user
            console.log("User ID from token:", userId);

            // Always use the authenticated user's ID
            const experienceObj = new ExperienceModel({
                ...data,
                createdBy: userId
            });

            const result = await experienceObj.save();

            return res.status(201).json({
                success: true,
                message: "Experience saved successfully",
                data: result
            });

        } catch (exception) {
            next(exception)
        }
    }

    getUserExperiences = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const experiences = await ExperienceModel.find({ createdBy: userId })
                .sort({ startDate: -1 })
                .populate('createdBy', 'name email'); // Optional: populate user details

            return res.json({
                success: true,
                data: experiences
            });
        } catch (exception) {
            next(exception);
        }
    };
}

const experienceCtrl = new ExperienceController();
export default experienceCtrl;