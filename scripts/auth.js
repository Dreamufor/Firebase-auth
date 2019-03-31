// add admin cloud function
const adminForm = document.querySelector('.admin-actions');

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
        console.log(result);
    })
})





//get data from firestore
// db.collection('guides').get().then(snapshot => {
//     //console.log(snapshot.docs);
//     setupGuides(snapshot.docs);
// });
 
 

//listen for auth status changes
auth.onAuthStateChanged(user =>{
    //console.log(user)
    if(user){

        // db.collection('guides').get().then(snapshot => {
        //     //console.log(snapshot.docs);
        //     setupGuides(snapshot.docs);
        //     //toggle UI element
        //     setupUI(user);
        // });
          user.getIdTokenResult().then(idTokenResult => {
              //console.log(idTokenResult.claims.admin);
              user.admin = idTokenResult.claims.admin;
               //toggle UI element
              setupUI(user);
          })
          //onSnapshot is to set firestore realtime listener
          db.collection('guides').onSnapshot(snapshot => {
            //console.log(snapshot.docs);
            setupGuides(snapshot.docs);

        }, err => {
            console.log(err.message);
        });
    }else{
        //console.log('user logged out');
        setupUI();
        setupGuides([]);
    }
});


// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // add data from create 
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        //close modal and rest form
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})



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
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });      
    }).then(() => {
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

