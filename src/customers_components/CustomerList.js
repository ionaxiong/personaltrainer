import React, { useState, useEffect } from "react";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err));
    };

  return (
    <div >
        Customer List
    </div>
    );
}

export default CustomerList;
