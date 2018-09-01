let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_+=~`',.?/ ";
let alphabetChars = alphabet.split('');
let lookUps = {};
for(let i = 0; i < alphabet.length; i++){
	lookUps[alphabet.substring(i,i+1)] = i;
}

let encrypt = function(initialPhrase, encryptString){
	let encryptedPhrase = "";
	for(let i = 0, j = 0; i < initialPhrase.length; i++, j = (j+1) % encryptString.length){
		encryptedPhrase += alphabetChars[(lookUps[initialPhrase.substring(i,i+1)] + lookUps[encryptString.substring(j,j+1)]) % alphabet.length];
	}
	return encryptedPhrase;
}

let decrypt = function(encryptedPhrase, encryptString){
	let decryptedPhrase = "";
	for(let i = 0, j = 0; i < encryptedPhrase.length; i++, j = (j+1) % encryptString.length){
		if(lookUps[encryptedPhrase.substring(i,i+1)] < lookUps[encryptString.substring(j,j+1)]){
			decryptedPhrase += alphabetChars[lookUps[encryptedPhrase.substring(i,i+1)] + alphabet.length - lookUps[encryptString.substring(j,j+1)]];
		}else {
			decryptedPhrase += alphabetChars[lookUps[encryptedPhrase.substring(i,i+1)] - lookUps[encryptString.substring(j,j+1)]];
		}
	}
	return decryptedPhrase;
}
