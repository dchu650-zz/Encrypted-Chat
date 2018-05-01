let myFirebase = new Firebase('https://primordial-arc-146121.firebaseio.com/');
let usernameInput = document.querySelector('#username');
let textInput = document.querySelector('#text');
let postButton = document.querySelector('#post');
let keyInput = document.querySelector('#key');
let setKeyButton = document.querySelector('#setKey');
let messageArray = [];
let msgKey;

  setKeyButton.addEventListener("click", function(){
    msgKey = keyInput.value;
  });

  postButton.addEventListener("click", function(){
    let msgUser = usernameInput.value;
    let msgText = textInput.value;
    if(msgKey != undefined){
      let encryptText = encrypt(msgText, msgKey);
      myFirebase.push({username:msgUser, text:encryptText});
    }
    else{
      myFirebase.push({username:msgUser, text:msgText});
    }
    textInput.value = "";
  });


  let startListening = function(){
    myFirebase.on('child_added', function(snapshot){
      console.log("snapshot val username " + snapshot.val().username);
      console.log("snapshot val text " + snapshot.val().text);
      let msg = snapshot.val();
      let firebaseReturnMsg = snapshot.value().text;
      messageArray.push(firebaseReturnMsg, this.state.key);



      let msgUsernameElement = document.createElement("b"); 
      msgUsernameElement.textContent = msg.username;
      let msgTextElement = document.createElement("p");
      // insert code here
      // message.map(snapshot.val().text, this.state.key)
      // 
      let testArray = [];
      testArray.push(snapshot.val().text);
      console.log(testArray);
      if(msgKey != undefined){
        msgTextElement.textContent = decrypt(msg.text,msgKey);
      }
      else{
        msgTextElement.textContent = msg.text;
      }
      let msgElement = document.createElement("div");
      msgElement.appendChild(msgUsernameElement);
      msgElement.appendChild(msgTextElement);
      msgElement.className = "msg";
      document.getElementById("results").appendChild(msgElement);
    });
  }
  startListening();

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state={    
      encryptionKey: null,
      messageArray: []
    }
  }
  render(){
    return(
      null
    );
  }
}