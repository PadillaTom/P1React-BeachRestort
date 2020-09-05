import styled from 'styled-components';
import defaultImg from '../images/room-1.jpeg';
// Styled Components:
// Son hechos en JS, podemos agregar Variables, etc....
// LA MAGIA: Podemos pasar PROPS!!!!!!!!!!!!!!!
//           Entonces elegir en props la imagen. Accediendo a los parametros del Object
//
//Main:
const StyledHero = styled.header`
  min-height: calc(100vh - 66px);
  background: url(${(props) => props.img}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;
