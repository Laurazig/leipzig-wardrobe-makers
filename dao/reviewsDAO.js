import mongodb from "mongodb"   //? auto added: import { text } from "express"
const ObjectId = mongodb.ObjectId  // convert string to mongodb object id

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.MAKERS_NS).collection("reviews")
            //console.log(reviews)
        } catch (e) {
            console.error(`unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = { name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId), 
            }

            return await reviews.insertOne(reviewDoc)  //unable to post review: TypeError: Cannot read properties of undefined (reading 'insertOne')
            //no schema
        } catch (e) {
            console.error(`unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

}