import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about">
      <div className="about-sections">
        <div className="about-section section-github" onClick={() => window.open("https://github.com/nathanUoY", "_blank")}>
          <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*N1fmHtI8gmkH_2Vu.png" alt="GitHub logo" className="GitHub-Logo" />
          <p>View some of my work on GitHub</p>
        </div>
        <div className="about-section section-york" onClick={() => window.open("https://www.york.ac.uk/about/awards/", "_blank")}>
          <img src="https://features.york.ac.uk/inspirational-research-leaders/assets/vUDVKQC7z6/uoy-logo-stacked-shield-pms432-800x369.png" alt="University of York" className="uoy-logo" />
          <p>Studied at the University of York</p>
        </div>
        <div className="about-section section-maths" onClick={() => window.open("https://www.hendrix.edu/uploadedimages/Departments_and_Programs/Math_and_Computer_Science/main-logo.png", "_blank")}>
          <img src="https://www.hendrix.edu/uploadedimages/Departments_and_Programs/Math_and_Computer_Science/main-logo.png" alt="Maths and Computer Science" className="math-cs-logo" />
          <p>4 Year MMath degree in Maths & Computer Science</p>
        </div>
        <div className="about-section section-esimgo" onClick={() => window.open("https://esim-go.com/", "_blank")}>
          <img src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/330996/NEWLOGO-2024-RGB-630x420-246b2a03-d535-4b92-8d23-5b2754aa617c.png" alt="eSIMgo" className="esimgo-logo" />
          <p>Work placement at eSIMgo</p>
        </div>
      </div>
    </div>
  );
}

export default About;
