import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
import { getAnser } from './Dsa.js';
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET','POST'],
    credentials: true,
    optionsSuccessStatus: 200

  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/data', async (req, res) => {
     const value = req.body.ques;
     console.log(value);
    try{
        const answer = await getAnser(value);
        res.json({success:true,answer:answer} );
    }
    catch(err){
        console.log(err);
    }

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 