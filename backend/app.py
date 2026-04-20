from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def knapsack_fractional(items, capacity):
    """
    Solve fractional knapsack problem using greedy algorithm.
    
    Args:
        items: List of tuples (value, weight)
        capacity: Maximum weight capacity
    
    Returns:
        Dictionary with total_value, total_weight, and selected_items
    """
    # Calculate value-to-weight ratio and create indexed items
    indexed_items = []
    for i, (value, weight) in enumerate(items):
        if weight > 0:
            ratio = value / weight
            indexed_items.append({
                'index': i,
                'value': value,
                'weight': weight,
                'ratio': ratio,
                'fraction': 0
            })
    
    # Sort by ratio in descending order
    indexed_items.sort(key=lambda x: x['ratio'], reverse=True)
    
    total_value = 0
    total_weight = 0
    selected_items = []
    
    for item in indexed_items:
        if total_weight + item['weight'] <= capacity:
            # Take the whole item
            total_weight += item['weight']
            total_value += item['value']
            item['fraction'] = 1.0
            selected_items.append(item)
        else:
            # Take fraction of item
            remaining_capacity = capacity - total_weight
            if remaining_capacity > 0:
                fraction = remaining_capacity / item['weight']
                total_value += item['value'] * fraction
                total_weight += remaining_capacity
                item['fraction'] = fraction
                selected_items.append(item)
            break
    
    return {
        'total_value': round(total_value, 2),
        'total_weight': round(total_weight, 2),
        'capacity': capacity,
        'selected_items': selected_items
    }

@app.route('/')
def index():
    return jsonify({'message': 'Knapsack API is running'})

@app.route('/api/solve', methods=['POST'])
def solve():
    try:
        data = request.get_json()
        capacity = float(data.get('capacity', 0))
        items = []
        
        for item in data.get('items', []):
            value = float(item.get('value', 0))
            weight = float(item.get('weight', 0))
            if value > 0 and weight > 0:
                items.append((value, weight))
        
        if not items or capacity <= 0:
            return jsonify({'error': 'Invalid input'}), 400
        
        result = knapsack_fractional(items, capacity)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
