import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const SubmittedProductCard = ({ product }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {product.quantity != null && product.quantity > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-black px-3 py-1 text-xs font-semibold tracking-wide text-white">
            Qty: {product.quantity}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
          {product.category}
        </p>
        <h3 className="text-lg font-bold leading-tight text-black">{product.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>
        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-xl font-bold tracking-tight text-black">
            {formatCurrency(product.price)}
          </span>
          <span className="rounded-full border border-black px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black transition-colors group-hover:bg-black group-hover:text-white">
            New
          </span>
        </div>
      </div>
    </article>
  );
};

export default SubmittedProductCard;
