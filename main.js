// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Add the .hidden class to the error modal in the HTML so it does not appear 
// when the page first loads
const ERROR_NODE=document.getElementById("modal")
ERROR_NODE.className= `hidden`

// Add click listeners to all of the posts, when the document has been loaded
function addClickListeners() {
  likeArray = document.querySelectorAll('.like-glyph')
  likeArray.forEach( function(element) {
    element.addEventListener('click',setApiHeartLike )
  } )
}

// Do the API call, and either set the heart or catch the error
function setApiHeartLike( event ) {
  ERROR_NODE.className= `hidden` // reset the error message
  mimicServerCall()
  .then( (data) => setHeartLike( data, event ) )
  .catch( displayError );
}

// Set the heart
function setHeartLike( data, event ) {
    if (event.target.innerText == EMPTY_HEART) {
      event.target.innerText=FULL_HEART
      event.target.setAttribute("class","activated-heart")
    }  else {
      event.target.innerText=EMPTY_HEART
      event.target.removeAttribute("class")
    }
}

// If an error is caught, display it for 5 seconds
function displayError( error ) {
  ERROR_NODE.className=`display`
  document.querySelector("#modal-message").innerText=error
  setTimeout(function() {ERROR_NODE.className=`hidden`;},5000)
}

// Add the listeners, when the DOM is loaded
document.body.onload = addClickListeners

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
