import express from "express";
import { requireAuth } from "../../../utilities";

const router = express.Router();

router.get("/currentuser", requireAuth, (req, res) => {
  res.send({ currentUser: req.user });
});

export { router as currentUserRouter };

