const utilsModule = {

base_url : "http://localhost:3000/api",

hideModals(){
    const modalElemList= document.querySelectorAll('.modal')
    for (const modalElem of modalElemList){
    modalElemList.classList.remove('is-active');
  }
  },

dragAndDrop(){
    const dragAndDropElem = document.getElementById('drag-and-drop');
    const sortable = Sortable.create(dragAndDropElem);
  },

};