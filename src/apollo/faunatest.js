const dotenv = require("dotenv").config()

const faunadb = require("faunadb")
const q = faunadb.query;

console.log(dotenv);

    (
        async () => {

            var client = new faunadb.Client({
                secret: process.env.FAUNA
            })

            try {
                // const result = await client.query(
                //     q.Create(q.Collection("bookmark"),{
                //         data: {
                //             url: "https://docs.netlify.com/functions/functions-and-identity/",
                //             desc: "Netlify Functions",
                //         }

                //     })
                // )
                const result = await client.query(
                    q.Paginate(q.Match(q.Collection("bookmark")))
                )



                console.log(result)



            }catch (err){
                console.log(err)

            }

            console.log("hello")
        }
    )()

