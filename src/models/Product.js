import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: Number,
  stock: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Nuevo campo para almacenar el propietario del producto
});

export default mongoose.model('Product', productSchema);

