const express = require("express");
const CourseController = require("../controllers/CourseController");

const router = express.Router();

router.post("/courses", CourseController.createCourse);
router.get("/courses", CourseController.getCourse);
router.get("/courses/relative", CourseController.getRelativeCourses);
router.get("/courses/dateRange", CourseController.getCourseWithDateRange);
router.get(
  "/courses/orderByTopSale",
  CourseController.getCoursesOrderByTopSale
);
router.get(
  "/courses/top3/latest/male",
  CourseController.getCourseTop3LatestOfMale
);
router.get(
  "/courses/top3/latest/female",
  CourseController.getCourseTop3LatestOfFemale
);
router.get(
  "/courses/top3/latest/kid",
  CourseController.getCourseTop3LatestOfKid
);
router.get(
  "/courses/topSalerForMale",
  CourseController.getCourseTop3LatestOfMale
);
router.get(
  "/courses/topSalerForFemale",
  CourseController.getCourseTopSalerForFemale
);
router.get(
  "/courses/topSalerForKid",
  CourseController.getCourseTopMostSalerForKid
);
router.get("/courses/color", CourseController.getColor);
router.get("/courses/size", CourseController.getSize);
router.get("/courses/:id", CourseController.getCourseById);
router.put("/courses/:id", CourseController.updateCourse);
router.delete("/courses/:id", CourseController.deleteCourse);
router.post("/courses/:id/comments", CourseController.postComment);
router.put(
  "/courses/:id/delComments/:commentId",
  CourseController.deleteComments
);
router.post("/upload", CourseController.uploadAvatar);

module.exports = router;
