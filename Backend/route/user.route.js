import router from "./auth.route.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import userCtrl from "../controller/user.controller.js";

router.get("/list", authMiddleware, userCtrl.getUserList);

router.patch("/update/:id", authMiddleware,userCtrl.update)

router.get("/:id", authMiddleware, userCtrl.getUserById);

export default router;