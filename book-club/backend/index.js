const express=require('express')
const cors=require('cors')
const connection=require('./config/db');
const bookRoutes=require('./routes/book.route')

require('dotenv').config();
const PORT=process.env.PORT || 3000

const app=express();
app.use(express.json())
app.use(cors({
    origin:'*'
}))

app.use('/api/books', bookRoutes);

app.get('/',(req,res)=>{
    res.send("server is working fine")
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log(`Server is running on port ${PORT} and connected to db`)
    } catch (error) {
        console.log(`Error while connecting to db ${error}`)
    }
})