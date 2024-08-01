import React from 'react';
import '../SectionCard.css';

function SectionCard({ sectionClass, imgSrc, imgAlt, text, link }) {
  return (
    <div className={`section-card ${sectionClass}`} onClick={() => window.open(link, "_blank")}>
      <img src={imgSrc} alt={imgAlt} className="section-card-logo" />
      <p>{text}</p>
    </div>
  );
}

export default SectionCard;
