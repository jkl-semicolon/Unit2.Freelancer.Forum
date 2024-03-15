const freelancersArray = [
  {name: 'Alice', occupation: 'Writer', startingPrice: '$30',},
  {name: 'Bob', occupation: 'Teacher', startingPrice: '$50',},
]
// This is the starting array of freelancers that populate upon entering the webpage.

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
// After a set interval, the first freelancer in this array is removed and added to the 
// end of freelancers array.

const additionalNames = ['Kelly','Linda','Marvin','Nell','Oscar','Pedro','Quincy','Romeo','Samantha','Timothy','Uma','Vanessa','Warren','Xerxes','Yanni','Zoey'];
const additionalOccupations = ['Evangelist','Ninja','Ghostbuster','Magician','Animal Therapist','Playwright','Elephant Whisperer','Overlord','Color Expert','Cultist','Surfing Instructor','Fortune Cookie Writer','Human Statue','Graffiti Artist','Food Taster','Ice Sculptor'];
const additionalStartingPrices = ['$150','$2','$750','$1,100','$444',"$101",'$90','$666','$42','$300','$35','$20','$65','$190','$222','$1,200'];
// Once our toBeAddedFreelancersArray is empty, we can randomize different combinations
// of additionalNames, additionalOccupations, and additionalStartingPrices to our freelancersArray.

const render = () => {
// Our render function will turn the array of freelancer objects above to be populated in our webpage.
// Each object has three properties; each property will be turned into an html 'h3' element with
// the text of that h3 element being the value of the property.
// The three h3 elements then replace the existing elements in their corresponding container.
// Our render function also calculates the average starting price of the freelancers on our webpage,
// and displays it as text in an 'h2' html element.

  const nameList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.name}`));
    return element;
  });
  document.querySelector('#nameDiv').replaceChildren(...nameList);
  // We use the .map() method on our freelancers array to create an array of html 'h3' elements
  // to replace any existing elements in our '#nameDiv' html container.

  const occupationList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.occupation}`));
    return element;
  });
  document.querySelector('#occupationDiv').replaceChildren(...occupationList);
  // We use the .map() method on our freelancers array to create an array of html 'h3' elements
  // to replace any existing elements in our '#occupationDiv' html container.

  const startingPriceList = freelancersArray.map((currentFreelancer) => {
    const element = document.createElement('h3');
    element.appendChild(document.createTextNode(`${currentFreelancer.startingPrice}`));
    return element;
  });
  document.querySelector('#startingPriceDiv').replaceChildren(...startingPriceList);
  // We use the .map() method on our freelancers array to create an array of html 'h3' elements
  // to replace any existing elements in our '#startingPriceDiv' html container.

  let averageStartingPrice = freelancersArray.reduce((total, currentFreelancer) => {
    return total + Number(currentFreelancer.startingPrice.replace(/[$,]+/g,''));  
  }, 0) / freelancersArray.length;
  // We calculate the average starting price using .reduce(). Since the starting price values
  // in the freelancers array are strings, we must first convert to numbers (first removing any
  // dollar signs and commas using a regular expression).
  const tempAverageStartingPrice = Math.round(averageStartingPrice);
  averageStartingPrice = Math.trunc(averageStartingPrice * 100) / 100;
  if (averageStartingPrice !== tempAverageStartingPrice) averageStartingPrice = averageStartingPrice.toFixed(2);
  // I want no decimal places to show when the dollar amount is a whole number, while I want
  // two decimal places to show when the dollar amount is not a whole number. We accomplish this
  // using Math.round(), Math.trunc(), and toFixed() with a parameter of 2.
  const replaceLine = document.querySelector('#titleSection h2');
  const toReplaceLine = document.createElement('h2');
  toReplaceLine.appendChild(document.createTextNode(`The Average Starting Price is $${averageStartingPrice}.`));
  document.querySelector('#titleSection').replaceChild(toReplaceLine, replaceLine);
  // We replace the average price element in our webpage with the updated correct text.

}

render();
// We render our webpage once upon starting the webpage to populate our freelancers list
// with the current freelancers in our freelancers array.

const addFreelancer = () => {
  if (toBeAddedFreelancersArray.length > 0) freelancersArray.push(toBeAddedFreelancersArray.shift());
  else if (additionalNames.length && additionalOccupations.length && additionalStartingPrices.length > 0) {
    const randomNameIndex = Math.floor(Math.random() * additionalNames.length);
    const randomOccupationIndex = Math.floor(Math.random() * additionalOccupations.length);
    const randomStartingPriceIndex = Math.floor(Math.random() * additionalStartingPrices.length);
    freelancersArray.push({
      name: additionalNames[randomNameIndex],
      occupation: additionalOccupations[randomOccupationIndex],
      startingPrice: additionalStartingPrices[randomStartingPriceIndex],
    })
    additionalNames.splice(randomNameIndex, 1);
    additionalOccupations.splice(randomOccupationIndex, 1);
    additionalStartingPrices.splice(randomStartingPriceIndex, 1);
  } else clearInterval(addFreelancerInterval);
  
  render();
}
// This function allows us to add the first freelancer in our to be added freelancers array
// to the end of our main freelancers array. Once the to be added freelancers array is
// empty, it will then choose a random name, occupation, and starting price from our
// additional names, additional occupations, and additional starting prices arrays.
// Once that is also empty, the intervals are stopped. It then re-renders our webpage.

const addFreelancerInterval = setInterval(addFreelancer, 200);
// We set an interval of 3 seconds to add new freelancers to our array.