import React from "react";
import './ShowMore.css';


function ShowMore({handleMore}) {
    return (
        <div className='show-more'>
      <button className='show-more__button' onClick={handleMore} >
        Ещё
      </button>
    </div>
    );
};

export default ShowMore;