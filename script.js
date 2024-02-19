
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB762feH3twxgjGMo4PqWDZRlYwRwjyL-o",
    authDomain: "backend-formulario.firebaseapp.com",
    projectId: "backend-formulario",
    storageBucket: "backend-formulario.appspot.com",
    messagingSenderId: "914705358390",
    appId: "1:914705358390:web:dea3a5da1bc06a74d3c297",
    measurementId: "G-SF510FPP2G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()


    let inName = document.getElementById('name')
    let errorName = document.getElementById('nameError')

    if (inName.value.trim() === '') {
        errorName.textContent = 'Introduce un nombre'
        errorName.classList.add('error-message')
    } else {
        errorName.textContent = ''
        errorName.classList.remove('error-message')
    }

    let emailIn = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailIn.value)) {
        emailError.textContent = 'Ingrese un correo electronico correcto'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    let passwordIn = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')

    if (passwordIn.value.length < 8) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres'
        passwordError.classList.add('error-message')
    } else {
        passwordError.textContent = ''
        passwordError.classList.remove('error-message')
    }
    console.log('ERRORES:', errorName.textContent, emailError.textContent, passwordError.textContent);

    if (!errorName.textContent && !emailError.textContent && !passwordError.textContent) {

        // Add a second document with a generated ID.
        db.collection("users").add({
            name: inName.value,
            email: emailIn.value,
            password: passwordIn.value,
        })
        .then((docRef) => {
            alert('Registro Exitoso', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
    }
})