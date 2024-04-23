import React, { useState, useEffect } from "react";
import axios from "axios";
import Tracker from "./Tracker";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Tracker");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://expense-tracker-1-zb7p.onrender.com/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
    if (componentName === "History") {
      setFilteredTransactions(transactions);
    }
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    if (e.target.value === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (transaction) => transaction.type === e.target.value
      );
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <button onClick={() => handleComponentChange("Tracker")}>Tracker</button>
        <button onClick={() => handleComponentChange("Analytics")}>Analytics</button>
        <button onClick={() => handleComponentChange("History")}>History</button>
      </div>
      <div>
        {selectedComponent === "Tracker" && <Tracker />}
        {selectedComponent === "Analytics" && <Analytics />}
        {selectedComponent === "History" && (
          <History
            transactions={filteredTransactions}
            typeFilter={typeFilter}
            handleTypeFilterChange={handleTypeFilterChange}
          />
        )}
      </div>
    </div>
  );
};

const Analytics = () => {

  return <div><h3>Analytics Component</h3></div>;
};

const History = ({ transactions, typeFilter, handleTypeFilterChange }) => {
  return (
    <div>
      <h3>History Component</h3>
      <div>
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select
          id="typeFilter"
          name="typeFilter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        >
          <option value="">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  return (
    <div style={cardStyle}>
      <p>User ID: {transaction.userId}</p>
      <p>Type: {transaction.type}</p>
      <p>Category: {transaction.category}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {transaction.date}</p>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "20px",
  padding: "10px",
  margin: "10px",
  width: "200px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "pink",
};

export default Dashboard;
