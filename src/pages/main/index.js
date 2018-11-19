import React from "react";
import styled from "styled-components";
import trident from "../../images/trident.svg";

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

const QuoteText = styled.q`
  font-size: 1.3em;
  font-weight: bolder;
`;

const QuoteAuthor = styled.p`
  text-align: right;
  font-size: 1.2em;
  margin: 0.5em 0;
`;

const MainContainer = () => (
  <MainPage>
    <img src={trident} alt="trident" />
    <div>
      <QuoteText>
        Учітесь, читайте, І чужому научайтесь, Й свого не цурайтесь
      </QuoteText>
      <QuoteAuthor>Т.Г. Шевченко</QuoteAuthor>
    </div>
  </MainPage>
);

export default MainContainer;
