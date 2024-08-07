import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import profileImage from '../images/profile.jpeg'; // Import the image

function Home() {
  const [modules, setModules] = useState([]);
  const [visibleModules, setVisibleModules] = useState({});
  const [isModulesVisible, setIsModulesVisible] = useState(false);

  const aboutCards = [
    {
      id: 1,
      className: 'section-github',
      image: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/0*N1fmHtI8gmkH_2Vu.png',
      alt: 'GitHub logo',
      text: 'View some of my work on GitHub',
      link: 'https://github.com/nathanUoY'
    },
    {
      id: 2,
      className: 'section-york',
      image: 'https://features.york.ac.uk/inspirational-research-leaders/assets/vUDVKQC7z6/uoy-logo-stacked-shield-pms432-800x369.png',
      alt: 'University of York',
      text: 'Studied at the University of York',
      link: 'https://www.york.ac.uk/about/awards/'
    },
    {
      id: 3,
      className: 'section-maths',
      image: 'https://www.hendrix.edu/uploadedimages/Departments_and_Programs/Math_and_Computer_Science/main-logo.png',
      alt: 'Maths and Computer Science',
      text: '4 Year MMath degree in Maths & Computer Science  ----*Click to see module results'
    },
    {
      id: 4,
      className: 'section-esimgo',
      image: 'https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/330996/NEWLOGO-2024-RGB-630x420-246b2a03-d535-4b92-8d23-5b2754aa617c.png',
      alt: 'eSIMgo',
      text: 'Work placement at eSIMgo',
      link: 'https://esim-go.com/'
    }
  ];

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

  const toggleModulesVisibility = () => {
    setIsModulesVisible(!isModulesVisible);
  };

  return (
    <div className="home">
      <div className="floating-card">
        <h2 className="profile-heading">Nathan Browne</h2>
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
      </div>
      <div className="about-cards">
        {aboutCards.map(card => (
          <div
            key={card.id}
            className={`about-card ${card.className}`}
            onClick={card.className === 'section-maths' ? toggleModulesVisibility : () => window.open(card.link, '_blank')}
          >
            <img src={card.image} alt={card.alt} className="about-card-image" />
            <p>{card.text}</p>
          </div>
        ))}
      </div>
      {isModulesVisible && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Home;
