import express from "express";
import MakersCtrl from "./makers.controller.js";
import ReviewCtrl from "./reviews.controller.js";

const router = express.Router();

console.log(MakersCtrl.apiGetMakersById);
router.route("/").get(MakersCtrl.apiGetMakers);
router.route("/id/:id").get(MakersCtrl.apiGetMakersById);
router.route("/clothes").get(MakersCtrl.apiGetMakersClothes);

router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewCtrl.apiUpdateReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router;