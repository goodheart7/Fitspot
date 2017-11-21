const K_SIZE = 40;
const imgUrl = "https://d30y9cdsu7xlg0.cloudfront.net/png/191697-200.png";
const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: 'cover',
  color: 'white',
  backgroundColor: '#5fb13d',
  border: '1px solid rgb(95, 177, 61)',
  borderRadius: 20,
  padding: 4,
  cursor: 'pointer'
};

const markerStyleHover = {
  ...markerStyle,
  border: '1px solid rgb(95, 177, 61)',
  color: '#f44336'
};
const infoWindowStyle = {
  width: 250,
  left:-6.5,
  marginLeft:0
};
const markerButton = {
    position: 'absolute',
    top: 12,
    right: -0,
    padding: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 26,
};
export {markerStyle, markerStyleHover,infoWindowStyle,markerButton, K_SIZE};
