let myFirebase = new Firebase('https://primordial-arc-146121.firebaseio.com/');
let usernameInput = document.querySelector('#username');
let textInput = document.querySelector('#text');
let postButton = document.querySelector('#post');
let keyInput = document.querySelector('#key');
let setKeyButton = document.querySelector('#setKey');
let msgKey;

setKeyButton.addEventListener("click", function(){
  msgKey = keyInput.value;
})

postButton.addEventListener("click", function(){
  let msgUser = usernameInput.value;
  let msgText = textInput.value;
  let encryptText = encrypt(msgText, msgKey);
  myFirebase.push({username:msgUser, text:encryptText});
  textInput.value = "";
});
let startListening = function(){
  myFirebase.on('child_added', function(snapshot){
    
    let msg = snapshot.val();
    let msgUsernameElement = document.createElement("b"); 
    msgUsernameElement.textContent = msg.username;
    let msgTextElement = document.createElement("p");
    msgTextElement.textContent = decrypt(msg.text,msgKey);

    let msgElement = document.createElement("div");
    msgElement.appendChild(msgUsernameElement);
    msgElement.appendChild(msgTextElement);
    msgElement.className = "msg";
    document.getElementById("results").appendChild(msgElement);
  });
}
startListening();