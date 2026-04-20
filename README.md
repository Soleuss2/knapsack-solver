# Fractional Knapsack Problem Solver

A full-stack application for solving the Fractional Knapsack Problem with a React frontend and Python Flask backend.

## Project Structure

```
├── backend/          # Flask Python backend
│   ├── app.py
│   └── requirements.txt
├── frontend/         # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

- **React Frontend**: Modern interactive UI with real-time form updates
- **Python Backend**: Robust knapsack algorithm implementation with Flask
- **API Communication**: Axios for backend calls
- **CORS Support**: Full cross-origin resource sharing
- **Responsive Design**: Works on desktop and mobile

## Setup Instructions

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.7+ (for backend)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create Python virtual environment:
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# or
source venv/bin/activate      # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Run Vite development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Set the knapsack capacity
3. Add items with values and weights
4. Click "Solve Problem" to get the optimal solution
5. View the results showing:
   - Total value achieved
   - Total weight used
   - Item selection with fractions

## Algorithm

The solution uses a **greedy approach**:
1. Calculate value-to-weight ratio for each item
2. Sort items by ratio in descending order
3. Add items with highest ratios until capacity is full
4. Take a fraction of the next item if needed

## Example

**Input:**
- Capacity: 50
- Item A: Value=60, Weight=10
- Item B: Value=100, Weight=20
- Item C: Value=120, Weight=30

**Output:**
- Total Value: 240
- Total Weight: 50/50
- Selection: A (full) + B (full) + C (2/3)

## Technology Stack

- **Frontend**: React 18, Vite, Axios, CSS3
- **Backend**: Flask, Flask-CORS, Python
- **API**: RESTful with JSON

## API Endpoint

### POST `/api/solve`

**Request:**
```json
{
  "capacity": 50,
  "items": [
    {"value": 60, "weight": 10},
    {"value": 100, "weight": 20},
    {"value": 120, "weight": 30}
  ]
}
```

**Response:**
```json
{
  "total_value": 240.0,
  "total_weight": 50.0,
  "capacity": 50,
  "selected_items": [
    {
      "index": 0,
      "value": 60,
      "weight": 10,
      "ratio": 6.0,
      "fraction": 1.0
    }
  ]
}
```
