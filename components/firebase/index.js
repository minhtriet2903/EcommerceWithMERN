import firebase from "firebase/app";                                                                    
     import "firebase/auth"; // If you need it                                                                 
    import "firebase/firestore"; // If you need it                                                            
    import "firebase/storage"; // If you need it 

  
    const firebaseConfig = {
        apiKey: "AIzaSyDvnzQqVJwobFqs151t-z9V3iBXNQZsFqo",
        authDomain: "fir-react-upload-992b7.firebaseapp.com",
        projectId: "fir-react-upload-992b7",
        storageBucket: "fir-react-upload-992b7.appspot.com",
        messagingSenderId: "572412261482",
        appId: "1:572412261482:web:90a0b203997515dbc54613",
        measurementId: "G-MBHSXQSQZB"
      };
     
 if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
 }
      
    



const storage = firebase.storage();

export {storage,firebase as default};