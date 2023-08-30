function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertDecimetersToInchesAndMeters(decimeters) {
    const inches = (decimeters * 3.937).toFixed(2);
    const meters = (decimeters / 10).toFixed(2);
    return `${inches} ( ${meters} m)`;
  }

  function getRandomInt() {
    return Math.floor(Math.random() * 101);
  }