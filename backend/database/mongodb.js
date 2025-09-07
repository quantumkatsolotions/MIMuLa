import mongoose from 'mongoose';

import { DB_CONNECTION_STRING, NODE_ENV } from '../config/env.js';

if (!DB_CONNECTION_STRING){
    throw new Error('Invalid DB Connection string: please define it');
}

const connectToDB = async () => {
    try{
        await mongoose.connect(DB_CONNECTION_STRING);

        console.log(`Connected successfully in ${NODE_ENV} mode`)
    }catch(error){
        console.error('Failed to connect to DB', error);

        process.exit(1);
    }
}

export default connectToDB;