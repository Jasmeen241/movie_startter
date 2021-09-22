// Add DOM selectors to target input and UL movie list
const addMovieInput = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const filterInput = document.querySelector("#filter");
const movieHistory = document.querySelector("#movieHistoryCard");
let myMovies = {};

const updateMovieHistory = () => {
  let myTable = `
      <h5 class="card-title">Movie History</h5>
      <table id="movieHistoryTable">
          <tr>
              <th style='width: 400px;'>Title</th>
              <th style='width: 300px; text-align: right;'>Watched</th>
          </tr>
          ${Object.keys(myMovies)
            .map((key) => {
              return `<tr><td>${key}</td><td style='text-align: right;'>${myMovies[key]}</td></tr>`;
            })
            .join("")}
      </table>
      `;
  movieHistory.innerHTML = myTable;

  // Bring back the movie list on Page Reload
  myMovieList.innerHTML = Object.keys(myMovies) // ["Harry Potter", "Spiderman"]
    .map((key) => {
      return `<li>${key}</li>`;
    })
    .join("");
};
//==================================================================================================

//=======Check if local storage contains movies already=============
if (localStorage.getItem("myMovies")) {
  myMovies = JSON.parse(localStorage.getItem("myMovies")); //deserialize
  updateMovieHistory();
}
// ==========================================

// Function to clear the input after a user types something in
let clearInput = () => {
  addMovieInput.value = "";
};

// =========== Function to check if key exists in object======================
const keyExists = (value, obj) => {
  obj = Object.keys(obj);
  for (let i = 0; i < obj.length; i++) {
    if (value.toLowerCase() === obj[i].toLowerCase()) {
      return true;
    }
  }
  return false;
};

//=================== Function to handle Filter Input =========================
filterInput.addEventListener("keyup", (e) => {
  myMovieList.innerHTML = "";
  let userFilterInputVal = e.target.value.toLowerCase(); // s
  let movieList = Object.keys(myMovies); // [spiderman, superman, batman]
  let filteredList = movieList.filter(
    // [spiderman, superman]
    (item) => item.toLowerCase().includes(userFilterInputVal) // "spiderman".includes("") // true
  );
  for (let i = 0; i < filteredList.length; i++) {
    // [spiderman, superman]
    // Create the list item:
    let item = document.createElement("li");

    // Set its contents:
    item.appendChild(document.createTextNode(filteredList[i]));

    // Add it to the list:
    myMovieList.appendChild(item);
  }
});
// ============================================================

// This function is executed when the user clicks [ADD MOVIE] button.
let addMovie = () => {
  // Step 1: Get value of input
  let userTypedText = addMovieInput.value; // Harry Potter

  let keyFound = keyExists(userTypedText, myMovies); // true
  if (userTypedText === ''){
    alert('enter something')
  }else{

  if (!keyFound) {
    // Step 2: Create an empty <li></li>
    let li = document.createElement("li"); // <li></li>

    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    let textToInsert = document.createTextNode(userTypedText);

    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li.appendChild(textToInsert);

    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);
  }

  // Insert movie into Object

  if (keyFound) {
    myMovies[userTypedText.toLowerCase()]++;
    localStorage.setItem("myMovies", JSON.stringify(myMovies)); // serialization
  } else {
    myMovies[userTypedText.toLowerCase()] = 1; // insert movie into object and give it value of 1
    localStorage.setItem("myMovies", JSON.stringify(myMovies));
  }

  // Step 6: Call the clearInput function to clear the input field
  clearInput();

  updateMovieHistory(userTypedText); // Harry Potter
  }
};
function clearMovies() {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = '';
}
