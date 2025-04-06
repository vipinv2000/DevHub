import React from 'react'
import { useNavigate } from 'react-router-dom'
import card3 from '../../assets/card3.png'
import card4  from '../../assets/card4.png'
import styled from 'styled-components';
import Heroflow from './Heroflow';

function Hero() {
    const navigate = useNavigate()
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-blue-300 p-4">
   
    <div className="flex flex-col md:flex-row w-full gap-4" >
      {/* Left Div */}
      <div className="flex-1 text-white p-6 flex flex-col items-center justify-center min-h-[350px]"
       style={{
        backgroundImage: `url(${card4})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
       }}> 
        <h2 className="text-4xl text-black font-bold mb-4">EDU Connect</h2>
        <p className="mb-4 text-black"></p>
        <StyledWrapper>
      <button href="#" className="button bg-cyan-300"style={{  background:'rgb(13, 13, 13)   ' }} onClick={()=> {navigate('/devFlow/Educonnect')}}>
        <span className="button__icon-wrapper bg-cyan-300">
          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
        </span>
        Explore All
      </button>
    </StyledWrapper>
      </div>

      {/* Right Div */}
      <div className="flex-1  text-black p-6 flex flex-col items-center justify-center min-h-[350px]"
       style={{
        backgroundImage: `url(${card3})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
       }}>
        <h2 className="text-4xl  font-bold mb-4">EduPath Nexus</h2>
        <p className="mb-4"></p>
        <StyledWrapper> 
      <button href="#" className="button bg-cyan-300"style={{  background:'rgb(13, 13, 13)   ' }} onClick={()=> {navigate('/')}}>
        <span className="button__icon-wrapper bg-cyan-300">
          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
        </span>
        Explore All
      </button>
    </StyledWrapper>
      </div>
    </div>

    {/* Moving Cards Section */}
 <Heroflow/>
  </section>
  )
}

const StyledWrapper = styled.div`
  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--clr);
    color: #fff;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: var(--clr);
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #000;
  }

  .button:hover .button__icon-wrapper {
    color: #000;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }`;

export default Hero