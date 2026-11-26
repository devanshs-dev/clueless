import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import * as D from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
export const db=D.getDatabase(initializeApp({apiKey:"AIzaSyDggglOfFRfZHIEkLTeooY9vRFb-dXYh5Q",authDomain:"testing-ziago.firebaseapp.com",databaseURL:"https://testing-ziago-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"testing-ziago",appId:"1:573041699267:web:a365a3075205c295c6b576"}));
export {D};
