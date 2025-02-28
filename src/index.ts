import app from "./app";
import connectDB from "./lib/db";
import { env } from "./constants";



const PORT = env.port || 5000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is listening on PORT: ${PORT}`)
    });
}
    
)
.catch((error)=>{
    console.log(error)
})