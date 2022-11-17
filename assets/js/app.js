
// on objet qui contient des fonctions
const app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.showAddListModal();
    app.hideModals();
    app.handleAddListForm();
    app.makeListInDOM();
  },




addListenerToActions(){
 const addListButtonElem= document.getElementById('addListButton');
 addListButtonElem.addEventListener('click', app.showAddListModal);
 const closeModalButtonElemList= document.querySelectorAll('.close');
 for (const buttonElem of closeModalButtonElemList){
 buttonElem.addEventListener('click',app.hideModals);
}
const addListFormElem=document.querySelector('#addListModal form');
addListFormElem.addEventListener('submit',app.handleAddListForm);
},

showAddListModal(){
document.getElementById('addListModal').classList.add('is-active');
document.querySelector("#addListModal .input").focus();

},

hideModals(){
  const modalElemList= document.querySelectorAll('.modal')
  for (const modalElem of modalElemList){
  modalElemList.classList.remove('is-active');
}
},

handleAddListForm(event){
  event.preventDefault();
  const formElem = event.target;
  const formDataObject= new FormData(formElem);
  const listName= formDataObject.get('name');
  app.makeListInDOM(listName);
  app.hideModals();
  },

makeListInDOM(listName){
const template = document.getElementById('template-list');
const newListElem= document.importNode(template.content, true);
newListElem.querySelector('h2').textContent=listName;
const listContainer=document.querySelector('#list-container');
listContainer.appendChild(newListElem);
},

document.addEventListener('DOMContentLoaded', app.init );