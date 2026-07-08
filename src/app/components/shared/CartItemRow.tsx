import { Trash2, Plus, Minus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

interface Props {
  item: import('../../data/types').CartItem
}

export function CartItemRow({ item }: Props) {
  const { updateCartItemQty, removeFromCart } = useApp()
  const { language } = useApp()

  const customText = item.selectedCustomizations
    ? Object.entries(item.selectedCustomizations).map(([group, opts]) =>
      `${group}: ${opts.join(', ')}`
    ).join(' | ')
    : null

  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-sm">{language === 'am' && item.nameAm ? item.nameAm : item.name}</h4>
            {customText && (
              <p className="text-xs text-muted-foreground mt-0.5">{customText}</p>
            )}
          </div>
          <p className="font-semibold text-sm flex-shrink-0 ml-2">{formatCurrency(item.price * item.quantity)}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateCartItemQty(item.id, -1)}
              className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateCartItemQty(item.id, 1)}
              className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1.5 rounded-full text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
