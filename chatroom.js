class ChatRoom extends React.Component {
  constructor(props) {
  	super(props);
    this.state={  	
      encryptionKey: null
    }
  }

  let messageArray = [],
  	  message = "",
  	  usernameInput = document.querySelector('#username'),
  	  textInput = document.querySelector('#text'),
  	  postButton = document.querySelector('#post'),
  	  keyInput = document.querySelector('#key'),
  	  setKeyButton = document.querySelector('#setKey'),
  	  msgKey,
  	  myFirebase = new Firebase('https://primordial-arc-146121.firebaseio.com/');

  setKeyButton.addEventListener("click", function(){
  	this.setState({
  	  encryptionKey: keyInput.value;
  	})
  });

  encryptMessage(msgText){
  	if (this.state.encryptionKey) {
  	  	message = encrypt(msgText, this.state.encryptionKey);
  	}
  	else{
  		message = textInput.value;
  	}
  }

  postButton.addEventListener("click", function(){
    let msgUser = usernameInput.value;
    let msgText = textInput.value;
    if(msgKey != undefined){
      let encryptText = encryptMessage(msgText);
      messageArray.push({username:msgUser, text:encryptText, key:this.state.encryptionKey});
      myFirebase.push({username:msgUser, text:encryptText});
    }
    else{
      messageArray.push({username:msgUser, text:encryptText});
      myFirebase.push({username:msgUser, text:msgText});
    }
    textInput.value = "";
  });

  render(){
  	return (
  	   <div>{messagesArray.map(message => <Message text={message.text} cryptoKey={this.state.encryptionKey} />)}</div>
  	);
  }
}

//store message in array and firebase then render.






// What do I need to have in the chatroom?
// Encryption Key => state for chatroom
// Chatroom bundles the message and encryption key as props for Message
// The message + encryption key is an array
// When each encryption key state is changed, each message would get the new props an recompute.
// Only thing that would change in this cause would be the property for key because the message is static

// render() {
//     return (
//       <div>{messagesArray.map(message => <Message text={message.text} cryptoKey={state.cryptoKey} />)}</div>
//     );
// }

// render() {
//     return React.createElement('div', null, `Hello ${this.props.toWhat}`);
//   }
// }

// ReactDOM.render(
//   React.createElement(ChatRoom, {toWhat: 'World'}, null),
//   document.getElementById('root')
// );