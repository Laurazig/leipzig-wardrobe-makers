import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req,res,next){
        try{
            const makerId = req.body.maker_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()
            console.log(req.body)
            const ReviewResponse = await ReviewsDAO.addReview(
                makerId,
                userInfo,
                review,
                date,
            )
            //await ReviewResponse.save() //added by Naqvi
            res.json({ status: "success"})
        } catch (e){
            res.status(500).json({error:e.message})
        }
    }

    static async apiUpdateReview(req,res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const ReviewResponse= await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error} = ReviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ReviewResponse.modifiedCount ===0){
                throw new Error(
                    "unable to update review - user may not be original poster"
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id  //not standard for HTTP del request have anything in body-  simple authentication
            console.log(reviewId)
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success"})
        } catch (e){
            res.stus(500).json({ error: e.message})
        }
    }

}