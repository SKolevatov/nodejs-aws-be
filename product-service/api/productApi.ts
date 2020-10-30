const products = [
    {
        "id": "1",
        "name": "Bristlecone",
        "manufacture": "Google",
        "qubits": 72,
        "price": 23000000
    },
    {
        "id": "2",
        "name": "Sycamore",
        "manufacture": "Google",
        "qubits": 54,
        "price": 19000000
    },
    {
        "id": "3",
        "name": "Tenerife",
        "manufacture": "IBM",
        "qubits": 5,
        "price": 1000000
    },
    {
        "id": "4",
        "name": "Yorktown",
        "manufacture": "IBM",
        "qubits": 5,
        "price": 1000000
    },
    {
        "id": "5",
        "name": "Melbourne",
        "manufacture": "IBM",
        "qubits": 14,
        "price": 3000000
    },
    {
        "id": "6",
        "name": "Rüschlikon",
        "manufacture": "IBM",
        "qubits": 16,
        "price": 3200000
    },
    {
        "id": "7",
        "name": "Tokyo",
        "manufacture": "IBM",
        "qubits": 20,
        "price": 4000000
    },
    {
        "id": "8",
        "name": "Austin",
        "manufacture": "IBM",
        "qubits": 20,
        "price": 4000000
    },
    {
        "id": "9",
        "name": "Acorn",
        "manufacture": "Rigetti",
        "qubits": 19,
        "price": 3800000
    },
    {
        "id": "10",
        "name": "Aspen-1",
        "manufacture": "Rigetti",
        "qubits": 16,
        "price": 3100000
    },
    {
        "id": "11",
        "name": "Agave",
        "manufacture": "Rigetti",
        "qubits": 8,
        "price": 2300000
    },
    {
        "id": "12",
        "name": "Tangle Lake",
        "manufacture": "Intel",
        "qubits": 49,
        "price": 18000000
    }
];

export const fetchProducts = async () => Promise.resolve(products);