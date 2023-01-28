import express from "express";

const router = express.Router();

router.post("/signout", (req, res) => {
  // Clear the session data
  req.session = null;

  // Send an empty response
  res.send({});
});

export { router as signoutRouter };
