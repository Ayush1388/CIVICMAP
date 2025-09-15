import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from './config/passport.js'; // adjust path if needed
import { authenticateJWT } from './middleware/auth.js'; // assuming you have a JWT middleware


dotenv.config();
const app =express();
app.use(cors());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());


import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';

app.use('/api/auth',authRoutes);
app.use('/api/user/issue',userRoutes);
app.use('/api/admin',adminRoutes);


// Example protected route
app.get("/dashboard", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

async function main(){
    
    await mongoose.connect("process.env.MONGO_URL");
    console.log('MongoDB connected');
    app.listen(3001);
    console.log("listening on port 3001");
}


main();





