import express from "express";
import MakersCtrl from "./makers.controller.js";

const router = express.Router();

console.log(MakersCtrl.apiGetMakersById);
router.route("/").get(MakersCtrl.apiGetMakers);
router.route("/id/:id").get(MakersCtrl.apiGetMakersById);
router.route("/clothes").get(MakersCtrl.apiGetMakersClothes);

export default router;