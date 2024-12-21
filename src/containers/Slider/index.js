import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // tri par ordre décroissant check si data et focus existe
  const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) => 
    new Date(evtB.date)- new Date (evtA.date) 
  ):[];

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000); // Changer la carte toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyage à la désinstallation
  }, [byDateDesc.length]); // Dépendance sur la longueur de la liste

  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 ? (
        byDateDesc.map((event, idx) => (
          <div
            key={event.id || idx} // Utiliser event.id pour la clé unique
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Aucun événement à afficher</div> // Message alternatif si aucun événement
      )}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id || radioIdx} // Utiliser event.id pour la clé unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Vérifie si l'index correspond au bouton radio
              onChange={() => setIndex(radioIdx)} // Change l'index en cliquant sur le bouton radio
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
