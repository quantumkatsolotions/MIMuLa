import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'Category is required'],
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    description: {
        type: String,
        minLength: 6,
        maxlength: 100,
        lowercase: true,
        trim: true
    },
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
     }
}, { timestamps: true });

const category = mongoose.model('Category', categorySchema);

export default category;