import { useState } from 'react'
import reactLogo from './assets/react.svg'
import gamePad from '/gamepad.png';
import star from '/star.svg';
import './App.css';



const Card = ({title, mrp, compared, count}) => {
  return(
    <div className="card_wrapper">
      <div className="card_img_wrapper">
        <img src={gamePad} alt="" />
      </div>
      
      <div className="card_info">
        <h3 className="card_info_name">{title}</h3>
        <div className="card_info_price">
          <div className="card_info_price_mrp">{mrp}</div>
          <div className="card_info_price_compared">{compared}</div>
        </div>
        <div className="card_info_rating">
          <div className="card_info_rating_star">
            <img src={star} alt="" />
          </div>
        </div>
        <div className="card_info_rating_count">
          <div>{count}</div>
        </div>
      </div>
    </div>
  )
}
const App = () => {
  return(
    <div>
      <Card title="HAVIT HV-G92 Gamepad" mrp="$139" compared="$140" count={139} />
    </div>
  )
}

export default App
