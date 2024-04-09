const router = require("express").Router();
const authController = require("../controllers/authController");
const relationController = require("../controllers/relationController");
router.use(authController.protect, authController.restrictTo("admin"));
router
  .get("/", relationController.getAllRelations)
  .post("/", relationController.createRelation);

router
  .get("/:id", relationController.getRelationById)
  .patch("/:id", relationController.updateRelation)
  .delete("/:id", relationController.deleteRelation);

module.exports = router;
