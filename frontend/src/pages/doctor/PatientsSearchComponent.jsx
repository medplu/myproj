import React, { useState } from 'react';

const PatientSearchComponent = () => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState(['John Doe', 'Jane Smith', 'Alice Johnson']);

  const filteredPatients = patients.filter(patient =>
    patient.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h3>Patient Search</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search patients"
        className="border p-2 rounded"
      />
      <ul className="mt-4">
        {filteredPatients.map((patient, index) => (
          <li key={index} className="border-b py-2">{patient}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSearchComponent;
