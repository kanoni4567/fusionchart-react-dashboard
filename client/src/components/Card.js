import React from "react";

const Card = props => {
  const value = props.value;
  return (
    <div className='card mr-0 custom-card'>
      <div className='card-body'>
        {props.src ? (
          <img src={props.src} className='img-responsive float-right' />
        ) : null}
        <h6 className='card-title mb-4 '>{props.header} </h6>
        <h2 className='mb-1 text-primary'>{value}</h2>
        <p className='card-text'>
          <small className='text-muted'>{props.label || ""}</small>
        </p>
      </div>
    </div>
  );
};

export default Card;
