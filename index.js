const sql=require("mysql")
const express=require("express")
const app=express()
const moment = require('moment-timezone');

const connection=sql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database: "sqldatabase",
    timezone: 'Asia/Kolkata'
})

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log('Connected to MySQL database');
    }
})



app.use(express.json())

app.get("/",(req,res)=>{
    const query="SELECT * FROM data1"
    connection.query(query,(error,results)=> {
        if(error){
            res.status(400).send(error.message)
        }else{
            res.status(200).json(results)
        }
    })

})
// npm install moment-timezone
app.post('/insertData', (req, res) => {
    const { name } = req.body;

 
    const currentTimestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    const query = 'INSERT INTO data1 (name, registration_date) VALUES (?, ?)';
    connection.query(query, [name, currentTimestamp], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }else{
            res.status(200).send('Data inserted successfully');
        }


        
    });
});




app.listen(5500,()=>{
    console.log("server is listening at 5500")
})


















