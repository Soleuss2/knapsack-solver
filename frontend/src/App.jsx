import { useState } from 'react'
import axios from 'axios'
import { FiPackage, FiSettings, FiPlay, FiAlertCircle, FiPlus } from 'react-icons/fi'
import ItemForm from './components/ItemForm'
import SolutionDisplay from './components/SolutionDisplay'
import './App.css'

function App() {
  const [capacity, setCapacity] = useState('50')
  const [items, setItems] = useState([
    { id: 1, name: 'A', value: '60', weight: '10' },
    { id: 2, name: 'B', value: '100', weight: '20' },
    { id: 3, name: 'C', value: '120', weight: '30' }
  ])
  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nextId, setNextId] = useState(4)

  const addItem = () => {
    setItems([...items, { id: nextId, name: `Item ${nextId}`, value: '', weight: '' }])
    setNextId(nextId + 1)
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const solveKnapsack = async () => {
    setError(null)
    setLoading(true)

    try {
      const capacityNum = parseFloat(capacity)
      if (!capacityNum || capacityNum <= 0) {
        setError('Please enter a valid knapsack capacity')
        setLoading(false)
        return
      }

      const validItems = items
        .filter(item => parseFloat(item.value) > 0 && parseFloat(item.weight) > 0)
        .map(item => ({
          value: parseFloat(item.value),
          weight: parseFloat(item.weight)
        }))

      if (validItems.length === 0) {
        setError('Please add at least one valid item')
        setLoading(false)
        return
      }

      const response = await axios.post('http://localhost:5000/api/solve', {
        capacity: capacityNum,
        items: validItems
      })

      setSolution(response.data)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to solve')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          <FiPackage style={{ marginRight: '8px' }} />
          Knapsack Solver
        </h1>
        <p>Find the optimal item selection</p>
      </header>

      <div className="container">
        <div className="content">
          <div className="input-section">
            <h2>
              <FiSettings />
              Configuration
            </h2>
            
            <div className="form-group">
              <label>Knapsack Capacity:</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="50"
                step="0.1"
              />
            </div>

            <h3>Items</h3>
            <div className="items-list">
              {items.map(item => (
                <ItemForm
                  key={item.id}
                  item={item}
                  onUpdate={updateItem}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <button onClick={addItem} className="btn btn-secondary">
              <FiPlus />
              Add Item
            </button>

            {error && (
              <div className="error-message">
                <FiAlertCircle />
                {error}
              </div>
            )}

            <button
              onClick={solveKnapsack}
              disabled={loading}
              className="btn btn-primary"
            >
              <FiPlay />
              {loading ? 'Solving...' : 'Solve Problem'}
            </button>
          </div>

          <div className="output-section">
            {solution ? (
              <SolutionDisplay solution={solution} />
            ) : (
              <div className="placeholder">
                <FiPackage />
                <p>Solve the problem to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
