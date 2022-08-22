import mongodb from "mongodb"   
const ObjectId = mongodb.ObjectId
let makers  

export default class Makers   {
    static async injectDB(conn) { //call method when server starts, connects to DB
        if(makers){
            return
        }
        try {
            makers = await conn.db(process.env.MAKERS_NS).collection("makers")
        } catch (e) {
            console.error(
                `unable to establish a collection handle in makersDAO: ${e}`,
            )
        }
    }
    static async getMakers({  //method 
        filters = null,
        page = 0,
        makersPerPage = 20,

    } = {}) {
        let query
        if(filters) {
            if("name" in filters) {
                query ={$text: {$search: filters["name"] } }   // 29 mins- not working 
            } else if ("clothesItem" in filters) {
                query ={ "clothesItem": {$eq: filters["clothesItem"] } }   // not working
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            cursor = await makers
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { makersList: [], totalNumMakers:0}
        }

        const displayCursor = cursor.limit(makersPerPage).skip(makersPerPage * page)

        try {
            const makersList =await displayCursor.toArray()
            const totalNumMakers = await makers.countDocuments(query)

            return {makersList, totalNumMakers}
        } catch (e) {
            console.error(                                           // this error
                `convert cursor to array or problem counting documents, ${e}`,   
            )
            return { makersList: [], totalNumMakers:0}
        }
    }
    static async getMakersById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        $lookup:{
                            from: "reviews",
                            let:  {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$makers_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",
                        },
                    },
            ]
            return await makers.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getMakersById: ${e}`)
            throw e 
        }
    }

    static async getclothes(){
        let clothes = []
        try {
            clothes = await makers.distinct("clothesItem")
            console.log(clothes)
            return clothes
        } catch (e) {
            console.error(`Unable to get clothes, $(e)`)
            return clothes
        }
    }
}

