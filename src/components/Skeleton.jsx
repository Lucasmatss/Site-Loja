import { memo } from 'react'
import PropTypes from 'prop-types'

// Componente Skeleton para loading states (melhora percepção de performance)
const Skeleton = memo(function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClasses = 'animate-pulse bg-gray-700/50'

  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} aria-hidden="true" />
})

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['rectangular', 'circular', 'text']),
}

// Skeleton específico para card de produto
export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="bg-dark-secondary rounded-3xl overflow-hidden border-2 border-gray-800 h-full flex flex-col">
      {/* Imagem/Gradient area */}
      <Skeleton className="h-72 w-full" />

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <Skeleton variant="text" className="h-6 w-3/4 mb-3" />
        <Skeleton variant="text" className="h-6 w-1/2 mb-4" />

        {/* Info */}
        <div className="space-y-2 mb-4 flex-grow">
          <Skeleton variant="text" className="h-4 w-2/3" />
          <Skeleton variant="text" className="h-4 w-1/2" />
          <Skeleton variant="text" className="h-3 w-3/4 ml-7" />
        </div>

        {/* Button */}
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  )
})

// Grid de skeletons para o catálogo
export const ProductGridSkeleton = memo(function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
})

ProductGridSkeleton.propTypes = {
  count: PropTypes.number,
}

export default Skeleton
