



//get data from firestore
db.collection('guides').get().then(snapshot => {
    //console.log(snapshot.docs);
    setupGuides(snapshot.docs);
});



//listen for auth status changes
auth.onAuthStateChanged(user =>{
    //console.log(user)
    if(user){
        console.log('user loggeg in', user)
    }else{
        console.log('user logged out');
    }
});



//sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    //prevent default refresh page
    e.preventDefault();
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // console.log(email,password);

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user); 
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });   
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e)=> {
    e.preventDefault();
    auth.signOut();
    // auth.signOut().then(()=>{
         //console.log('user signed out'); 
    // });
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user);
        // close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});
