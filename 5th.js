// Homepage stuff

var j =1 //reset on load new page // reset opacity



function fadePageOut(x, fileLocation){      //function to fade out of pages and load new ones, pass in (div to fade -usually this.parentNode.parentNode, target file location), 1 function to go between pages
    //  savFile = sessionStorage.getItem("saveFile")   //gets save file
   setTimeout(function(){x.style.opacity = j;  //dosnt work in for loop due to nature of setTimeout function. sets opacity of target div    
    j += -0.01; // decrease j to decrease opacity
    if(j>-0.01){    // if statment to keep looping until opacity is -
        fadePageOut(x, fileLocation);} //calls itself with same passed in varables
        else{   //once opacity is 0

            if((localStorage.getItem(`QAsked${savFile}`) == 0) && !(typeof document.getElementsByClassName("unqiue")[0] == "undefined")){ //if statment checks (if the save file has been played yet by getting Qasked variable for that save) && (checks if div with class exists so it only runs for the page 5th.html) 

                setTimeout(function(){ page(fileLocation); }, 60000);   //runs function after video has finished, cantuse onended here
                document.getElementsByClassName("homePageContentContainer")[0].innerHTML = `  
            <video autoplay class="backgroundVid">
                <source src="intro/intro.mp4" type="video/mp4" />
            </video>` //sets div html to intro video
            }else{  //if savefile has been played go to target location
                 location.href = fileLocation;
            }
        
        }
    } , 25);
}

////////////////////////// check if needed 
function page(x){   //goes to file location passed in
  window.location.href=x;
}


function toggleNotepad(){ //toggles notpad overlay

    var Notepad = document.getElementById("Notepad");
    new Audio("pageFlip.mp3").play();
    setTimeout(function(){  //toggles noteplay display after slight display so audio can play first, makes it feel more real
        if (Notepad.style.display == "none") {  //if checks if notepad is not displayed
            document.getElementById("charName").innerHTML=selectedChar[savFile].name.toUpperCase();  //sets name of notepad
            document.getElementById("takenNotes").value = selectedChar[savFile].notes    //shows notes of selsected character
            Notepad.style.display = 'block';    //if its not displayed change its attribute to show it
        } else {
            selectedChar[savFile].notes = document.getElementById("takenNotes").value
            Notepad.style.display = "none"; //if its being displayed changes variable so its not shown
            localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //stores the newly added information into the selected characters unqiue array
        }
    },300)
   

}

///////// needed???
// function loadInterview(charName) {  //changes page to interview page 

//     window.location.href = "Interview page.html";
    
// }
//////////needed?
// function interviewLoad(charName) {  //changes page for specific selected character, runs onload

//     var container = document.getElementById("ContentContainer");
//     container.innerHTML = container.innerHTML.replace('<video>', `<video autoplay loop width="100%"> <source src = "interviews/${selectedChar.name}/stand%20by.mp4" type = "video/mp4" />`);//

// }


function askQuestion(questionNumber) { //function used to ask question, pass in the question number user wants to ask

    if (selectedChar[savFile].questions[questionNumber-1] == false) {  //checks if question has been asked by checking array in character object

        var questionVideo = document.getElementById("questionBox");
        questionVideo.setAttribute("src", `interviews/${selectedChar[savFile].name}/q${questionNumber}.mp4`);  //changes src to play video for question asked
        questionVideo.play();   //plays video
        document.getElementById("questionOverlay").style.display = "none"; //hides question overlay whilst video plays
        /// After question asked set questionNumber asked
        selectedChar[savFile].questions[questionNumber-1] = true; //sets value to true to store question being asked
        document.getElementById(`q${questionNumber}Box`).setAttribute("fill", "white");          ///change svg visual attribute to show itsbeen asked
        var QCounter = parseInt(localStorage.getItem(`QAsked${savFile}`))+1;  //gets number of question asked for save file and increment
        localStorage.setItem(`QAsked${savFile}`,QCounter) ;   ///saves question asked for save in storage
        localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //updates and saves character object array 

    } else {
        console.log("question asked");  //shows questions already asked

    }   

}

function removeVideo(x) { //removes src of video tag passed in , run after quesiton video finsihed,
    checkQs();  //checks how many questoinss asked
   x.setAttribute("src", ""); //removes src so video disapreas
   document.getElementById("questionOverlay").style.display = "block"; //makes quesitons overlay appear again
}

function checkQs(){ //checks how many questoinss asked

    if (parseInt(localStorage.getItem(`QAsked${savFile}`)) == 12) {    //runs this here so it checks question counter after video has finished

        window.location.href="AccuseChar.html"  //if questions for save = 12 changes page to accuse characters
        ///load choose supsenct screen
    
    }

}

////// object function askQuestion(x);, 
////// Pause function for all pages



class character { //objects for each character

    constructor(name) { //to constrcut new object
        this.name = name;   //sets name
        this.questions = [false, false, false, false];  //array for if quesiotn is asked
        this.notes = "";    //notes on character        
    }

    takeNotes(x){   //method to get the notes user types in

        this.notes = document.getElementById("takenNotes").value

    }

}




///////////needed?
PrisArray = { 0: new character("priscilla"), 1: new character("priscilla"), 2: new character("priscilla"), 3: new character("priscilla") };
JackArray = { 0: new character("jackson"), 1: new character("jackson"), 2: new character("jackson"), 3: new character("jackson"), };
MedArray = { 0: new character("medhini"), 1: new character("medhini"), 2: new character("medhini"), 3: new character("medhini"), };
HelArray = { 0: new character("helena"), 1: new character("helena"), 2: new character("helena"), 3: new character("helena") };

function selectChar(choice) { //changes variable to user selected character and loads interview screen, choice is character user chose, run on character selection page

    switch (choice) {   //each case selects diffrent char

        case 1:
            sessionStorage.setItem("selected", "Pris")      //stores the character user chose

            break;
        case 2:
            sessionStorage.setItem("selected", "Jack")

            break;
        case 3:
            sessionStorage.setItem("selected", "Med")

            break;
        case 4:
            sessionStorage.setItem("selected", "Hel")

            break;

    }

    window.location.href = "Interview page.html";   //loads interview page
   

}




function delSave(x) {   //reset save file passed in as x

    if (confirm("Are you sure you want to delete this save?")) {
        localStorage.setItem(`QAsked${x}`, 0);  //resets questions asked for save


        ////////neeeded?
        selectedChar = JSON.parse(localStorage.getItem('priscillaArray'));  ///gets array of objects which stores all the saves
        selectedChar[x] = new character("priscilla")    //resets information for specific array slot which is specific for that save(x)
        localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //saves the changes 

        selectedChar = JSON.parse(localStorage.getItem('jacksonArray'));
        selectedChar[x] = new character("jackson")
        localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //

        selectedChar = JSON.parse(localStorage.getItem('medhiniArray'));
        selectedChar[x] = new character("medhini")
        localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //
        
        selectedChar = JSON.parse(localStorage.getItem('helenaArray'));
        selectedChar[x] = new character("helena")
        localStorage.setItem(`${selectedChar[0].name}Array`,JSON.stringify(selectedChar)); //

        localStorage.setItem(`QAsked${x}`, 0);  //Number of questions asked per save


      } 
    //   else {

    // }

}

var savFile = sessionStorage.getItem("saveFile") //gets save file from storage, global variable as used a lot in all functions

function checkRun(){  //function to run once to ensure storages exist so theres no errors
if(localStorage.getItem("priscillaArray") == null){ //if item doesnt exist means user has not played ever 
    localStorage.setItem('priscillaArray',JSON.stringify(PrisArray))    //sets storage for object arrays, each object stores informaiton for 1 save, made an array so each array slot represents a save
    localStorage.setItem('jacksonArray',JSON.stringify(JackArray))
    localStorage.setItem('medhiniArray',JSON.stringify(MedArray))
    localStorage.setItem('helenaArray',JSON.stringify(HelArray))
    for(var i=0;i<4;i++){       //loops to set quesitons asked
        localStorage.setItem(`QAsked${i}`, "0");
        }
}
   
}


function loadVid() {  //used onload interview page to set background for who user chose
    var charQuestions=[]; //local variable array to store questions user can ask, done here to not take unessisary storage space
    switch (sessionStorage.getItem("selected")) {   //gets the character user selected in previous page

        case "Pris":
            selectedChar = JSON.parse(localStorage.getItem('priscillaArray')); //sets selected character variable to character array from storage
             charQuestions[0] = "Wasn't it your phone cable that killed him";
             charQuestions[1] = "What did you do when you found the body";
             charQuestions[2] = "Who do you think";
             charQuestions[3] = "What were you arguing about";
            break;//breaks switch statment
        case "Jack":
            selectedChar = JSON.parse(localStorage.getItem('jacksonArray'));
            charQuestions[0] = "Who do you think did this";
             charQuestions[1] = "What are you doing here";
             charQuestions[2] = "Where were you during the events";
             charQuestions[3] = "Why didn't you hear a struggle";
            
       
            break;
        case "Med":
            selectedChar = JSON.parse(localStorage.getItem('medhiniArray'));
             charQuestions[0] = "Who do you think did this";
             charQuestions[1] = "What did you think of Louis";
             charQuestions[2] = "What was your last encounter with Louis";
             charQuestions[3] = "Why didn't you go back to Priscilla";
            break;
        case "Hel":
            selectedChar = JSON.parse(localStorage.getItem('helenaArray'));
             charQuestions[0] = "Where did you go";
             charQuestions[1] = "Why do you have a key to the back door";
             charQuestions[2] = "How are the relationships with your flatmates";
             charQuestions[3] = "Who do you think did this?";
            break;
    }


    var test = document.getElementById("standbyLoop") //get video tag
    test.setAttribute("src", `interviews/${selectedChar[0].name}/stand%20by.mp4`); //sets src to selected characters folder and their stand by loop using the stored name as a variable
    var name = selectedChar[0].name; //local variable to temperarly hold name of selected
    for(var x=0;x<4;x++){   //goes through each question 


        var questionBox = document.getElementById(`q${x+1}Box`) // loop to write the questions based on selected character
            questionBox.innerHTML = charQuestions[x];

        if (selectedChar[savFile].questions[x]){        //if question for the selected character in that save has been asked
            questionBox.setAttribute("fill", "white");    //change visual to show this
        }


    }

}

document.addEventListener('keypress', pauseVideo);// event listener to pause question asking video 

function pauseVideo(e) {    // toggles video playing, pass in the event
    var vid = document.getElementById("questionBox");   //gets video tag element 
    var notepadCheck = document.getElementById("Notepad").style.display == "none" //checks if notepad is showing, so video pauses if user pressed space when typing note but dosnt play when user presses space again
    if(e.keyCode == 32 && vid.paused && notepadCheck){  //if spacebar has been pressed and the video is paused and notepad is not showing

        vid.play(); //play video

    }else if(e.keyCode == 32 && !(vid.paused)){ //if spacebar has been pressed and the video is playing 

        vid.pause();//pause video

    }

}
  
function removeBack(x){ //removes back button, passes in video tag, used onplay
    if(!(x.getAttribute("src") == null)){//checks if the video tag passed in has a src, so it only runs when video is playing
        document.getElementById("backButton").style.display="none"; //hide back button
    }
}

// sessionStorage accused 
function accuseChar(name,) { //accuses character passed in, passes in charactername


    sessionStorage.setItem("accused", name) //stores accused in session so it dosnt store unessisarily 
    var audio = new Audio("Dun.mp3");   //gets sound effect
    audio.play(); //plays sound effect
    // window.location.href="Results.html" //loads results

    fadePageOut(document.getElementById("ContentContainer"),'Results.html')
}

function outcome(){ //runs on load of results
    var text = document.getElementsByClassName("result1")[0].firstChild//where it displays results
    var accused = sessionStorage.getItem("accused",) //gets session stores item saved in previoous page
    if(accused=="jackson"){ //if the guess was correct
        text.innerHTML = "Correct"  //change innerhtml appropraitly if right/wrong 
        text.style.color="green"    //changes css property to reflect if right/wrong
    }else{  //if wrong
        text.innerHTML = "Incorrect"
        text.style.color="red"
    }
    document.getElementsByClassName("textBoxe")[0].innerHTML = `        You accused ${accused}.

        The killer was JACKSON!<br>
        The money was too tempting for his young mind and all that stood in his way was his brother.<br>
        After Medhini left without the phone cable he snuck back into the kitchen and strangled his brother to death. <br>
        You have been the 5th.<br>
        Now there must be just 4.<br>

        Created by Sliman Shams and Leonidas Baboulene`  //sets inner html of paragraph using name of person user accused
}  

function addSelectors(){ //used for character selection 

    for (var i=0;i<4;i++){  //to create event listener for all character hovers

        document.getElementsByClassName("selectCircle")[i].addEventListener("mouseover", function(event){ //changes opacity to 100 so user can see circle and css on character they hovered
            event.target.parentNode.parentNode.style.opacity = "100%"
        });
        document.getElementsByClassName("selectCircle")[i].addEventListener("mouseout", function(event){    //on mouse out changes opacity to hide the svg circle and name when user dosnt hover character
            event.target.parentNode.parentNode.style.opacity = "0%"
        });


    }

}
