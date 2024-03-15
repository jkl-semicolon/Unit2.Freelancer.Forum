const freelancersArray = [
  {name: 'Alice', occupation: 'Writer', startingPrice: '$30',},
  {name: 'Bob', occupation: 'Teacher', startingPrice: '$50',},
]

const toBeAddedFreelancersArray = [
  {name: 'Carol', occupation: 'Programmer', startingPrice: '$70',},
  {name: 'Darlene', occupation: 'Astronaut', startingPrice: '$200',},
  {name: 'Edmund', occupation: 'Scam Artist', startingPrice: '$0',},
  {name: 'Fitzgerald', occupation: 'Ballerina', startingPrice: '$60',},
  {name: 'Gerard', occupation: 'Fixer', startingPrice: '$2,000',},
  {name: 'Hayley', occupation: 'Thief', startingPrice: '$10',},
  {name: 'Iris', occupation: 'Chef', startingPrice: '$40',},
  {name: 'Julius', occupation: 'Caesar', startingPrice: '$300',}
]

const render = () => {

  const nameList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.name}`));
    return element;
  });
  document.querySelector('#nameDiv').replaceChildren(...nameList);

  const occupationList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.occupation}`));
    return element;
  });
  document.querySelector('#occupationDiv').replaceChildren(...occupationList);

  const startingPriceList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.startingPrice}`));
    return element;
  });
  document.querySelector('#startingPriceDiv').replaceChildren(...startingPriceList);

  let averageStartingPrice = freelancersArray.reduce((total, currentFreelancer) => {
    return total + Number(currentFreelancer.startingPrice.replace(/[$,]+/g,''));  
  }, 0) / freelancersArray.length;
  averageStartingPrice = Math.trunc(averageStartingPrice * 100) / 100;
  const replaceLine = document.querySelector('#titleSection h2');
  const toReplaceLine = document.createElement('h2');
  toReplaceLine.appendChild(document.createTextNode(`The Average Starting Price is $${averageStartingPrice}.`));
  document.querySelector('#titleSection').replaceChild(toReplaceLine, replaceLine);

}

render();

const addFreelancer = () => {
  const toBeAdded = toBeAddedFreelancersArray.shift();
  freelancersArray.push(toBeAdded);
  render();
  if (freelancersArray.length === 10) clearInterval(addFreelancerInterval);
}

const addFreelancerInterval = setInterval(addFreelancer, 5000);
