const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Beauty', 'Men', 'Women', 'Kids'],
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, min: 0, default: null },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.index({ title: 'text', description: 'text' });

const seedProducts = [
  {
    title: 'Velvet Glow Lipstick',
    price: 399,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
    description: 'Rich matte lipstick with long-lasting velvet finish for every mood.',
  },
  {
    title: 'Hydra Radiance Serum',
    price: 599,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight serum that hydrates and gives a natural luminous glow.',
  },
  {
    title: 'Lash Volume Mascara',
    price: 349,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80',
    description: 'Buildable mascara for bold, clump-free lashes all day.',
  },
  {
    title: 'City Pulse Jacket',
    price: 1599,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight utility jacket built for urban mornings and weekend escapes.',
  },
  {
    title: 'Classic Oxford Shirt',
    price: 899,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp cotton shirt with a tailored fit for work and weekends.',
  },
  {
    title: 'Slim Fit Denim',
    price: 1199,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
    description: 'Premium stretch denim with a modern slim silhouette.',
  },
  {
    title: 'Aurora Lounge Set',
    price: 1299,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
    description: 'Soft knit loungewear with a minimal chic finish for everyday comfort.',
  },
  {
    title: 'Floral Midi Dress',
    price: 1499,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
    description: 'Elegant midi dress with delicate floral print and flowing silhouette.',
  },
  {
    title: 'Structured Blazer',
    price: 1899,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1594633312681-425a7b956cc9?auto=format&fit=crop&w=400&q=80',
    description: 'Sharp tailored blazer that elevates any outfit instantly.',
  },
  {
    title: 'Playful Pop Sneakers',
    price: 1099,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
    description: 'Colorful sneakers with extra cushioning for active play all day.',
  },
  {
    title: 'Graphic Tee Pack',
    price: 699,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80',
    description: 'Fun graphic tees in soft cotton, perfect for everyday wear.',
  },
  {
    title: 'Cozy Fleece Hoodie',
    price: 799,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd884c10c?auto=format&fit=crop&w=400&q=80',
    description: 'Warm fleece hoodie with kangaroo pocket for chilly days.',
  },
];

productSchema.statics.seedDefaults = async function () {
  const count = await this.countDocuments();
  if (count > 0) return;
  await this.insertMany(seedProducts);
};

module.exports = mongoose.model('Product', productSchema);
