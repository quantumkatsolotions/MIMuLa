import mongoose from 'mongoose';

const grocerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String, // e.g., "2025-09" (YYYY-MM format)
    required: true,
  },
  shop: {
    type: String,
    trim: true,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Pre-save hook to auto-calc total
grocerySchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

const Grocery = mongoose.model('Grocery', grocerySchema);

export default Grocery;
