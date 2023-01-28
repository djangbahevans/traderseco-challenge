import express from "express";
import { currentUser } from "../../../utilities";

const router = express.Router();

router.get("/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.user });
});

export { router as currentUserRouter };
