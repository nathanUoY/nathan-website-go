import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home() {
  const [modules, setModules] = useState([]);
  const [visibleModules, setVisibleModules] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/modules')
      .then(response => response.json())
      .then(data => {
        const initialVisibility = data.reduce((acc, module) => {
          acc[module._id] = false;
          return acc;
        }, {});
        setModules(data);
        setVisibleModules(initialVisibility);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const toggleVisibility = (id) => {
    setVisibleModules(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="home">
      <h1>Modules</h1>
      <div className="module-buttons">
        {modules.map(module => (
          <button key={module._id} onClick={() => toggleVisibility(module._id)}>
            {module.moduleName}
          </button>
        ))}
      </div>
      <div className="module-cards">
        {modules.map(module => (
          visibleModules[module._id] && (
            <div key={module._id} className="module-card">
              <h2>{module.moduleName}</h2>
              <p>Code: {module.moduleCode}</p>
              <p>Mark: {module.moduleMark}</p>
              <p>Maths Module: {module.mathsModule ? 'Yes' : 'No'}</p>
              <p>Computing Module: {module.computingModule ? 'Yes' : 'No'}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Home;
