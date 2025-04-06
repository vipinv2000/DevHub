import React from 'react'
import styled from 'styled-components';
import card11 from '../../assets/card11.png'
import card7 from '../../assets/card7.png'
import card8 from '../../assets/card8.png'
import card9 from '../../assets/card9.png'
import card10 from '../../assets/card10.png'


function Heroflow() {
  return (
    <div>
    <div className="mt-10 w-full overflow-hidden relative">
    <div className="flex space-between gap-4 animate-marquee whitespace-nowrap">
      {/* Original Cards */}
      <StyledWrapper>
      <div className="card bk"  style={{
              backgroundImage: `url(${card11})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                
             }}>
       
        <div className="card__content">
          <p className="card__title">Project Name</p>
          <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </StyledWrapper>
    
    <StyledWrapper>
      <div className="card bk"     style={{
              backgroundImage: `url(${card7})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                
             }}>
        
        <div className="card__content">
          <p className="card__title">Project Name</p>
          <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        
        </div>
      </div>
    </StyledWrapper>
    
    <StyledWrapper>
      <div className="card bk"     style={{
              backgroundImage: `url(${card8})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                
             }}>
        
        <div className="card__content">
          <p className="card__title">Project Name</p>
          <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        
        </div>
      </div>
    </StyledWrapper>
    
    <StyledWrapper>
      <div className="card bk"     style={{
              backgroundImage: `url(${card9})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                
             }}>
        
        <div className="card__content">
          <p className="card__title">Project Name</p>
          <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        
        </div>
      </div>
    </StyledWrapper>
  

     
      
     
    </div>
  </div>

<style>
      {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
      `}
    </style>
    </div>
     
  )
}
const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    height : 160px;
   
    aspect-ratio: 16/9;
   
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 5pxrgba(255, 255, 255, 0.99);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card bk {
    width: 48px;
    fill: #333;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card__image {
    width: 100%;
    height: 100%;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 20px;
    color: #333;
    font-weight: 700;
  }

  .card:hover svg {
    scale: 0;
  }

  .card__description {
    margin: 10px 0 10px;
    font-size: 12px;
    color: #777;
    line-height: 1.4;
  }

  .card__button {
    padding: 15px;
    border-radius: 8px;
    background: #777;
    border: none;
    color: white;
  }

  .secondary {
    background: transparent;
    color: #777;
    border: 1px solid #777;
  }`;

export default Heroflow