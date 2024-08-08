  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getDatabase,get,set,push,child,ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
  import { getStorage, ref as sRef,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
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

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)
  const dbRef = ref(db, 'ecommerce/links')
  const dbRefGet = ref(db) 

let btnsave = document.getElementById('btnsave')
btnsave.addEventListener('click',saveLink)

let btncencal = document.getElementById('btncencal')
btncencal.addEventListener('click', canc)
function canc(){
    btncencal.setAttribute('style','visibility: hidden')
    btnsave.value = 'save'
}
function saveLink() {

    let btnsaveValue = btnsave.value
   let  objadmin = {}
   objadmin.linkTitle = document.getElementById('linkTitle').value
   objadmin.link = document.getElementById('link').value

   objadmin.key = document.getElementById('lblkey').innerHTML
    if(btnsaveValue == "Save"){
        
         objadmin.key = push(dbRef).key
        console.log(objadmin);
    }
  
    let newChild = child(dbRef,objadmin.key)

    set(newChild,objadmin).then(()=>{
    alert('Record Save')
    getData()
   })
}
getData()

let admin = []
 function getData(){
        get(child(dbRefGet,'ecommerce/links')).then((data)=>{
            console.log(data.val())
            if(data.val()) {
            admin = Object.values(data.val())
            console.log(admin)
        }
            fillTable()
        })
    }

function fillTable(){
    let tb = document.getElementById('tb')
    console.log(tb.rows.length)
    while(tb.rows.length > 0) {
        tb.deleteRow(0)
}
let tbContent = ''
console.log()
admin.forEach(element =>{
    tbContent += `<tr>
    <td>${element.linkTitle}</td>
    <td>${element.link}</td>
    <td>
    <button id = ${ element.key}> Edit </button>
    </td>
   </tr> `
    setTimeout(() => {
        var edibtn = document.getElementById(element.key)
        edibtn.addEventListener('click',(a) =>{
        admin.filter((e)=> {
             if(a.target.id == e.key){
                document.getElementById('lblkey').innerHTML = a.target.id
                btnsave.value = 'Update'
                btncencal.setAttribute('style','visibility: true')
                linkTitle.value = e.linkTitle
                link.value = e.link
             }
        })
        })
    }, 200); 
}       
)


 tb.innerHTML = tbContent



} 
const dbRefCard = ref(db, 'home/Cards')
const dbRefGetCard = ref(db)

let files = []
let reader = new FileReader()

let cardimg = document.getElementById('cardimg')
let picid = document.getElementById('picid')
let cardname = document.getElementById('cardname')
let cardtitle = document.getElementById('cardtitle')
let btnSaveCard = document.getElementById('saveCard')
let btnCancelCard = document.getElementById('btnCancelCard')

cardimg.onchange = e => {
    files = e.target.files
    console.log(files)
    reader.readAsDataURL(files[0])
}

reader.onload = function () {
    picid.src = reader.result
}

let saveCard = document.getElementById('saveCard')

saveCard.onclick = saveCardsmain

function saveCards(imgUrl) {	
//  console.log(imgUrl)
    let objadmins = {}
    let btnSaveCardvalue = btnSaveCard.value
    
     objadmins.cardTitle = document.getElementById('cardTitle').value
     objadmins.Rate = document.getElementById('rate').value

     objadmins.key = document.getElementById('lblcardkey').innerHTML
     objadmins.ImageURL = imgUrl

     if (btnSaveCardvalue == "Save") {
        objadmins.key = push(dbRefCard).key
        console.log(objadmins)
    }
    let newChild = child(dbRefCard, objadmins.key)

    set(newChild, objadmins).then(() => {
        alert('Record Save')
 } )
}





function saveCardsmain(){
    console.log('reach')
    uploadCardpic()
}



const storage =  getStorage()

async function uploadCardpic(){
    // let imageToUpload = files[0]
    let imageToUpload = files[0]
    let imageName = files[0].name
    const metaData = {
        contentType : imageToUpload.type

    }
    const storageRef = sRef(storage, "Images/" + imageName)
    const uploadTask = uploadBytesResumable(storageRef,imageToUpload,metaData)
    uploadTask.on('state-changed',(snapshot)=>{

    },(error)=>{
        alert('error',error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downURL)=>{
            console.log(downURL)
            saveCards(downURL)
        })
    })

}
 
