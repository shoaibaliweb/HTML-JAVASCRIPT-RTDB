import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase,get,set,push,child,ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt5rOr1RBAvYg_HcZBndVBAQ939gUihm0",
  authDomain: "hostaing-f9d4a.firebaseapp.com",
  projectId: "hostaing-f9d4a",
  storageBucket: "hostaing-f9d4a.appspot.com",
  messagingSenderId: "287178882704",
  appId: "1:287178882704:web:1c003c382cce3307b92215",
  measurementId: "G-V07P5C8YW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const dbRef = ref(db, 'ecommerce/links')
const dbRefGet = ref(db)

fillNavigationBar()
function fillNavigationBar(){
    get(child(dbRefGet,'ecommerce/links')).then((data)=>{
        //console.log(data.val())
        let links = Object.values(data.val())
        console.log(links)

        let nbr = document.getElementById('nbar')

        let lis = ''

        links.forEach(element => {
           lis += `<li class="nav-item ">
           <a class="nav-link active" aria-current="page" href="${element.link}">${element.linkTitle}</a>
         </li>`    
        });

        nbr.innerHTML = lis

    })
}
fillCard()
function fillCard(){
  get (child(dbRefGet, 'home/Card')).then((data)=>{
    let CardsAll = Object.values(data.val())
      console.log(CardsAll) 
      let mRow = document.getElementById('mRow')
      let crds = ''
      CardsAll.forEach(element => {
        crds +=`<div class="col">
              <div class="card" style="width: 18rem; background-color: rgb(43, 46, 226);">
                  <img src=${element.ImageURL} height="250px" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${element.cardTitle}</h5>
                    <p class="card-text">${element.Rate}</p>
                    <a href="#"><button id="mybutton1" class="bg-danger">Order Now</button></a>
                  </div>
                </div>
          </div>`
      });

      console.log(crds)
     mRow.innerHTML = crds
    })
}   

