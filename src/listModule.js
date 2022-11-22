const cardModule = require("./cardModule");
const utilsModule = require("./utilsModule");

const listModule = {

    showAddListModal(){
        document.getElementById('addListModal').classList.add('is-active');
        document.querySelector("#addListModal .input").focus();
        },

    async handleAddListForm(event){
            event.preventDefault();
            const formElem = event.target;
            const formDataObject= new FormData(formElem);
          
            //we call the API to send the new list
            try {
                  const response = await fetch(`${app.base_url}/lists`, {
                      method: 'POST',
                body: formDataObject,
                  });
          
              if (!response.ok) throw new Error(response);
              const createdList = await response.json();
          
              app.makeListInDOM(createdList);
          
              } catch (error) {
                alert("Impossible to create the list")
              }
          
            const listName= formDataObject.get('name');
            app.makeListInDOM(listName);
            app.hideModals();
          },

    makeListInDOM(listObject){
            const template = document.getElementById('template-list');
            const newListElem= document.importNode(template.content, true);
            newListElem.querySelector('h2').textContent=listObject.name;

            newListElem.querySelector('input[name="name"]').value = listObject.name; newListElem.quer
            //change list id 
            //const newId= 'list' + Date.now();
            newListElem.querySelector('.panel').dataset.listId= listObject.name;

            newListElem.querySelector('form input[name="id"]').value = listObject.id;


            
            newListElem.querySelector('button-add-card').addEventListener('click',cardModule.showAddCardModal);

            newListElem.querySelector('h2').addEventListener('dblclick',listModule.showEditListForm);

            newListElem.querySelector('.edit-list-form').addEventListener('submit',listModule.handleEditListForm);

            //trash icon

            newListElem.querySelector('button-delete-list').addEventListener('click',listModule.deleteList);

            //card drag and drop 

            const cardContainer = newListElem.querySelector('.panel-block');
            Sortable.create(cardContainer, {
                group: "list",
                onEnd: cardModule.handlDragCard
            });

            const listContainer=document.querySelector('#list-container');
            listContainer.appendChild(newListElem);
            },   

            showEditListForm(event){
                event.target.classList.add('is-hidden');
                //focus on the element next to "h2"
                const formElem= event.target.nextElementSibling;
                formElem.classList.remove('is-hidden');
                //other method without html dependance:
                //const formElem = event.target.closest('.panel').querySelector('form');
             
                },
            
                async handleEditListForm(event){
                    event.preventDefault( );
                    const editFormElem=event.target;
                    const formDataObject = new FormData (editFormElem);
                    const listId= formDataObject.get('id');
                    console.log(listId);

                    //call API
                    const h2Elem = event.target.previousElementSibling;

                  try {
            const response = await fetch(`${utilsModule.base_url}/lists/${listId}`, {
                method: 'PATCH',
                body: formDataObject
            });

            if (!response.ok) throw new Error(response);

            // si tout s'est bien passé : modifier le titre dans le DOM
            const json = await response.json();
            const newTitle = json.name;
            h2Elem.textContent = newTitle;

        } catch (error) {
            alert("Impossible d'éditer le nom de la liste");
        }
        editFormElem.classList.add('is-hidden');
        h2Elem.classList.remove('is-hidden');

                 
                },
        
        
    async deleteList(event) {
        // on récupère la liste dans le DOM
        const listElem = event.target.closest('.panel'); // on cible la liste parente de l'icone poubelle qui est cliquée
        // j'accède à l'id de la carte à supprimer grâce àà l'éttribut data-card-id dans le HTML
        // rppel : quandon a un data-un-truc dans le HTML, on peut y accéder en JS en faisant .dataset.unTruc (passé en camelCase)
        const cardId = listElem.dataset.cardId;

        const deleteConfirmed = confirm('Are you sure you went to supress this list?');

        if (!deleteConfirmed) return;
        
            try {
                const response = await fetch(`${utilsModule.base_url}/lists/${listId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error(response);

                // si on arrive ici c'est que tout s'est bien passé : la carte a été suprimée côté API, donc ola supprime aussi dans le DOM
                listElem.remove();

            } catch (error) {
                alert("Impossible to supress the list");
                console.error(error);
            }
        
    },
    
    async handleDragList(event){
        const allListsInDom = document.querySelectorAll('.panel');

        allListsInDom.forEach(async(listElem, listIndex)=>{
            const listId = listElem.dataset.listId;
            const formDataObject = new FormData();
            formDataObject;Set('position',listIndex);
            try {
                const response = await fetch(`${utilsModule.base_url}/lists/${listId}`, {
                    method: 'PATCH',
                    body: formDataObject
                });

                if (!response.ok) throw new Error(response);


            } catch (error) {
                alert("Impossible to move the list");
                console.error(error);
            }


         })

        },


   };

module.exports = listModule;