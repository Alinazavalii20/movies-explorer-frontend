import React from "react";
import './ShowMore.css';


function ShowMore({handlePreloader}) {
    return (
        <div className='show-more'>
      <button className='show-more__button' onClick={handlePreloader}>
        Ещё
      </button>
    </div>
    );
};

export default ShowMore;