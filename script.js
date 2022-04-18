// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//initialize the object used to store the password criteria as selected by the user.
var passwordCriteria = {
  size: 0,
  lowercase: 0,
  uppercase: 0,
  numeric: 0,
  special: 0
}
//function is called by the event listener "generateBtn.addEventListener" when the button is clicked.
function writePassword() {

  //call function to prompt user in order to determine password criteria
  criteriaPrompts ();

  //calls the function that generate password
  var password = generatePassword();

  //pass the newly generated password back to the text box in the html
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//function generates the new password based on the supplied criteria and appends each character to newPassword.
var generatePassword = function() {
  var newPassword = "";
  for (i = 0; i < passwordCriteria.size; i++){
    var charType = randomNumber(1, 4);

    //compare tye new charType and if it is a type of character the user wants, generate a random character from that character set.
    if (charType === 1 && passwordCriteria.lowercase === 1) {
      newPassword += genLowercase();
      console.log(newPassword);
    }
    else if (charType === 2 && passwordCriteria.uppercase === 1) {
      newPassword += genUppercase();
      console.log(newPassword);
    }
    else if (charType === 3 && passwordCriteria.numeric === 1) {
      newPassword += genNumeric();
      console.log(newPassword);
    }
    else if (charType === 4 && passwordCriteria.special === 1) {
      newPassword += genSpecial();
      console.log(newPassword);
    }
    else i--;
    
  }
  return newPassword;
}

//generates random numbers between and including min and max
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

//this function generates prompts to determine criteria for the password 
var criteriaPrompts = function() {
  
  while (passwordCriteria.size < 8 || passwordCriteria.size > 128) {
    passwordCriteria.size = window.prompt("How long should the password be? (8 - 128 characters)")
    if (passwordCriteria.size < 8 || passwordCriteria.size > 128) {
      window.alert ("Please enter a password size between 8 and 128 characters");
    }
  }

  while (passwordCriteria.lowercase === 0 && passwordCriteria.uppercase === 0 && passwordCriteria.numeric === 0 && passwordCriteria.special === 0) {
    var lowercaseConfirm = window.confirm("Would you like to include lowercase letters?");
    if (lowercaseConfirm) {
      passwordCriteria.lowercase = 1;
    }
    var uppercaseConfirm = window.confirm("Would you like to include uppercase letters?");
    if (uppercaseConfirm) {
      passwordCriteria.uppercase = 1;
    }
    var numericConfirm = window.confirm("Would you like to include numbers?");
    if (numericConfirm) {
      passwordCriteria.numeric = 1;
    }
    var specialConfirm = window.confirm("Would you like to include special characters?");
    if (specialConfirm) {
      passwordCriteria.special = 1;
    }
    if (passwordCriteria.lowercase === 0 && passwordCriteria.uppercase === 0 && passwordCriteria.numeric === 0 && passwordCriteria.special === 0){
      window.alert ("You must choose at least one type of character to include in your password!");
    }
    console.log(passwordCriteria);
  }
}

//functions generate a single character from the appropriate character type and return it.
var genLowercase = function() {
  return String.fromCharCode(97 + randomNumber(0, 25));
}

var genUppercase = function() {
  return String.fromCharCode(65 + randomNumber(0, 25));
}

var genNumeric = function() {
  return String.fromCharCode(48 + randomNumber(0, 9));
}

var genSpecial = function() {
  return String.fromCharCode(33 + randomNumber(0, 14));
}

// Run function writePassword on button click
generateBtn.addEventListener("click", writePassword);