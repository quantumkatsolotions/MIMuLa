import express from 'express';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

import { PORT } from './config/env.js';
import connectToDB from './database/mongodb.js';
import errorMiddleWare from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute);

app.use(errorMiddleWare);

app.get('/', (req, res) => {
    res.send("Welcome to Locator app");
});

app.listen(PORT, async () => {
    console.log(`The app is up and running here http://localhost:${PORT}`);

    await connectToDB();
})

export default app;