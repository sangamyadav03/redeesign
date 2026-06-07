const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

productSchema.statics.seedDefaults = async function () {
  const count = await this.countDocuments();
  if (count > 0) return;

  await this.insertMany([
    {
      title: 'Aurora Lounge Set',
      price: 1299,
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
      description: 'Soft knit loungewear with a minimal chic finish for everyday comfort.',
    },
    {
      title: 'City Pulse Jacket',
      price: 1599,
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      description: 'Lightweight utility jacket built for urban mornings and weekend escapes.',
    },
    {
      title: 'Playful Pop Sneakers',
      price: 1099,
      category: 'Kids',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
      description: 'Colorful sneakers with extra cushioning for active play all day.',
    },
    {
      title: 'Sculpted Essentials Bag',
      price: 899,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      description: 'A compact bag with smart storage and a clean modern look.',
    },
  ]);
};

module.exports = mongoose.model('Product', productSchema);
