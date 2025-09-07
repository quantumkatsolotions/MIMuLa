import mongoose from 'mongoose';


const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank', 'other'],
    default: 'other',
  },
  currency: {
    type: String,
    default: 'ZAR',
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
