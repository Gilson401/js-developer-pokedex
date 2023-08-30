


const currentUrl = new URL(window.location.href);
const params1 = new URLSearchParams(currentUrl.search);

const pokemonName = params1.get('name')
const pokemonId = params1.get('id')

const detailSection = document.getElementById('detailSection')

const title = document.getElementById('title')
const id = document.getElementById('id')
const detailTypes = document.getElementById('detailTypes')
const pokemonPhoto = document.getElementById('pokemonPhoto')
const abilities = document.getElementById('abilities')

const species = document.getElementById('species')
const height = document.getElementById('height')
const weight = document.getElementById('weight')
const eggGroups = document.getElementById('eggGroups')
const eggCycle = document.getElementById('eggCycle')

const genderMale = document.getElementById('genderMaleLabel')
const genderFemale = document.getElementById('genderFemaleLabel')
const genderOther = document.getElementById('genderOtherLabel')
const baseStatsTable = document.getElementById('baseStatsTable')



title.innerText = pokemonName;
id.innerText = "#" + "0".repeat(3 - pokemonId.length) + pokemonId;


pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` }, pokemonId)
  .then((res) => {
    pokemonPhoto.setAttribute("src", res.photo)
    pokemonPhoto.setAttribute("alt", `${res.name} image`)
    abilities.innerText = res.abilities

    species.innerText = capitalizeFirstLetter(res.name)
    height.innerText = convertDecimetersToInchesAndMeters(Number(res.height))
    weight.innerText = res.weight

    genderMale.innerText = res.genderMale
    genderFemale.innerText = res.genderFemale
    genderOther.innerText = res.genderAgender

    eggGroups.innerText = res.eggGroups
    eggCycle.innerText = res.eggGroups

    detailSection.classList.add(res.type)

    detailTypes.innerHTML = res.types.map((type) => `<li>${type}</li>`).join('')

  })




function generateBaseStats() {

  const attributtes = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total']
  return attributtes.map((attr, idx) => {
    const classColor = idx % 2 === 0 ? 'metter-red' : 'metter-green';
    const rndValue = getRandomInt();

    return `<tr>
              <td>${attr}</td>
              <td>${rndValue}</td>
              <td>
                  <div class="metter-background rounded-4">
                      <div class="metter-container rounded-4 ${classColor}" style="width:${rndValue}%"/>
                    </div>
              </td>
          </tr>`
  }).join('');

}


baseStatsTable.innerHTML = generateBaseStats()


function activateTab(evt, cityName) {

  let i = 0;
  const tabcontent = document.getElementsByClassName("tabcontent");
  const tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
