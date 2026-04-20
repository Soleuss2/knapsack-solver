import { FiCheckCircle, FiPackage } from 'react-icons/fi'
import './SolutionDisplay.css'

function SolutionDisplay({ solution }) {
  return (
    <div className="solution">
      <h2>
        <FiCheckCircle />
        Solution
      </h2>
      
      <div className="solution-summary">
        <div className="stat">
          <span className="label">Total Value</span>
          <span className="value">{solution.total_value}</span>
        </div>
        <div className="stat">
          <span className="label">Weight Used</span>
          <span className="value">{solution.total_weight} / {solution.capacity}</span>
        </div>
      </div>

      <table className="solution-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Value</th>
            <th>Weight</th>
            <th>Ratio</th>
            <th>Fraction</th>
            <th>Value Taken</th>
          </tr>
        </thead>
        <tbody>
          {solution.selected_items.map((item, idx) => (
            <tr key={idx}>
              <td><strong>{item.index + 1}</strong></td>
              <td>{item.value}</td>
              <td>{item.weight}</td>
              <td>{item.ratio.toFixed(2)}</td>
              <td>
                {item.fraction === 1 ? (
                  <span className="fraction-full">100%</span>
                ) : (
                  <span className="fraction-badge">{(item.fraction * 100).toFixed(0)}%</span>
                )}
              </td>
              <td><strong>{(item.value * item.fraction).toFixed(2)}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SolutionDisplay
