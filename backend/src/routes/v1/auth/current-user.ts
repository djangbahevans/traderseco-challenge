import express from "express";
import { requireAuth } from "../../../utilities";

const router = express.Router();

router.get(
  "/currentuser", 
  // requireAuth middleware ensures that the user is logged in
  requireAuth, 
  (req, res) => {
  // req.user contains the logged in user's information
  res.send({ currentUser: req.user });
});

export { router as currentUserRouter };
