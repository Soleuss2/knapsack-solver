import { FiTrash2 } from 'react-icons/fi'
import './ItemForm.css'

function ItemForm({ item, onUpdate, onRemove }) {
  return (
    <div className="item-row">
      <input
        type="text"
        value={item.name}
        onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
        placeholder="Item name"
        className="item-name"
      />
      <input
        type="number"
        value={item.value}
        onChange={(e) => onUpdate(item.id, 'value', e.target.value)}
        placeholder="Value"
        step="0.1"
        className="item-value"
      />
      <input
        type="number"
        value={item.weight}
        onChange={(e) => onUpdate(item.id, 'weight', e.target.value)}
        placeholder="Weight"
        step="0.1"
        className="item-weight"
      />
      <button
        onClick={() => onRemove(item.id)}
        className="btn btn-remove"
        title="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  )
}

export default ItemForm
