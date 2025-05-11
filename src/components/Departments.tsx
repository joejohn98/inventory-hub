import React from 'react';
import { useNavigate } from 'react-router-dom';

const Departments: React.FC = () => {
  const navigate = useNavigate();
  const departments = ['Kitchen', 'Clothing', 'Toys'];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Departments</h2>
      <div className="grid grid-cols-3 gap-6">
        {departments.map(dept => (
          <div
            key={dept}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/products?department=${dept.toLowerCase()}`)}
          >
            <h3 className="text-xl font-semibold">{dept}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;