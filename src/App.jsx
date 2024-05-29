import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [newBill, setNewBill] = useState({ debit: 0, credit: 0 });
  const [editedBill, setEditedBill] = useState({ debit: 0, credit: 0 });
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [lastBillInfo, setLastBillInfo] = useState({ lastBillNo: 0, lastBillDue: 0 });
  const [newBillNo, setNewBillNo] = useState(0);

  useEffect(() => {
    // Fetch accounts data from the server
    axios.get('http://localhost:3001/accounts')
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleAddBill = () => {
    if (selectedAccountId) {
      axios.post(`http://localhost:3001/addBill/${selectedAccountId}`, { newBill })
        .then(response => {
          if (response.data.success) {
            // Update the local state or fetch accounts again
            console.log('Bill added successfully!');
            setNewBill({ debit: 0, credit: 0 }); // Clear the input fields
            setNewBillNo(response.data.newBillNo); // Update the new bill number
          } else {
            console.error('Failed to add the bill:', response.data.error);
          }
        })
        .catch(error => console.error('Error adding the bill:', error));
    }
  };

  const getLastBillInfo = (accountId) => {
    const account = accounts.find(acc => acc._id === accountId);
    if (account && account.billing.length > 0) {
      const lastBill = account.billing[0];
      return {
        lastBillNo: lastBill.bill_no,
        lastBillDue: lastBill.last_bill_due
      };
    }
    return {
      lastBillNo: 0,
      lastBillDue: 0
    };
  };

  useEffect(() => {
    if (selectedAccountId) {
      const info = getLastBillInfo(selectedAccountId);
      setLastBillInfo(info);
    }
  }, [selectedAccountId, accounts]);

  return (
    <div>
      <h1>Accounts</h1>
      <select onChange={(e) => setSelectedAccountId(e.target.value)}>
        <option value="">Select an account</option>
        {accounts.map(account => (
          <option key={account._id} value={account._id}>{account._id}</option>
        ))}
      </select>

      {selectedAccountId && (
        <div>
          <h2>Add New Bill</h2>
          <p>Last Bill No: {lastBillInfo.lastBillNo}</p>
          <p>Last Bill Due: {lastBillInfo.lastBillDue}</p>
          <p>New Bill No: {newBillNo}</p>
          <label>Debit:
            <input type="number" value={newBill.debit} onChange={(e) => setNewBill({ ...newBill, debit: e.target.value })} />
          </label>
          <label>Credit:
            <input type="number" value={newBill.credit} onChange={(e) => setNewBill({ ...newBill, credit: e.target.value })} />
          </label>
          <button onClick={handleAddBill}>Add Bill</button>
        </div>
      )}

      {accounts.map(account => (
        <div key={account._id}>
          <h2>Total Due: {account.totalDue}</h2>
          {account.billing.map(billing => (
            <div key={billing.bill_no}>
              <p>Bill No: {billing.bill_no}</p>
              <p>Debit: {billing.debit}</p>
              <p>Credit: {billing.credit}</p>
              <p>Last Bill Due: {billing.last_bill_due}</p>
              <p>Due: {billing.due}</p>
              <label>Edit Debit:
                <input type="number" value={editedBill.debit} onChange={(e) => setEditedBill({ ...editedBill, debit: e.target.value })} />
              </label>
              <label>Edit Credit:
                <input type="number" value={editedBill.credit} onChange={(e) => setEditedBill({ ...editedBill, credit: e.target.value })} />
              </label>
              <button onClick={() => handleEditBill(account._id, billing.bill_no)}>Edit Bill</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

