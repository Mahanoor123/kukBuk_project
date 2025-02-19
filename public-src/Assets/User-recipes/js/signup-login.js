// ----------------------------------------------------for user loginin
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.config.js";

const register = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(name);
    console.log(email);
    console.log(password);
    
    try {
        let userCredintial = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredintial?.user);
    }
    catch (error) {
        console.log(error.message);
    }
};

document.getElementById("signup-form")?.addEventListener("submit", register);



// ----------------------------------------------------for user signin
const signIn = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    
    try {
        let userCredintial = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(userCredintial?.user);

        if (userCredintial?.user) window.location.pathname = "/index.html";
    } catch (error) {
        console.log(error.message);
    }
};

console.log(window.location.pathname);
document.getElementById("login-form")?.addEventListener("submit", signIn);


// ----------------------------------------------------for user
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    }

    else {
        console.log("user signed out");
    }
});