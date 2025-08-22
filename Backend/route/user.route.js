import router from "./auth.route.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import userCtrl from "../controller/user.controller.js";
import experienceCtrl from "../controller/experience.controller.js";

router.get("/list", authMiddleware, userCtrl.getUserList);

router.patch("/update/:id", authMiddleware,userCtrl.update)

router.get("/:id", authMiddleware, userCtrl.getUserById);


router.post("/experience", authMiddleware, experienceCtrl.addExperience);

router.get("/experience/:userId", authMiddleware, experienceCtrl.getUserExperiences);

export default router;