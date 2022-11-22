const cardModule = {
    showAddCardModal(event){
        const modalElem=document.getElementById('addCardModal');
        modalElem.classList.add('is-active');
        const listElem=event.target.closest('.panel');
        const listId = listElem.dataset.listId;
        console.log('Id de la liste cliquée :' + listId);
        const hiddenInputElem = modalElem.querySelector('input[name="list_id"]');
        hiddenInputElem.value = listId;
        },
    
    

async handleAddCardForm(event){
    event.preventDefault();
    const formDataObject=new FormData(event.target);
    
      //we call the API to send the new card
      try {
            const response = await fetch(`${utilsModule.base_url}/cards`, {
                method: 'POST',
          body: formDataObject,
            });
    
        if (!response.ok) throw new Error(response);
        const createdCard = await response.json();
    
        app.makeCardInDOM(createdCard);
    
        } catch (error) {
          alert("Impossible to create the list")
        }
    
    utilsModule.hideModals();
    },

    makeCardInDOM(cardObject){
        const templateElem=document.getElementById('template-card');
        
        const newCard=document.importNode(templateElem.content, true);
        
        const cardContent=cardObject.content;
        
        newCard.querySelector('.card-name').textContent=cardContent;
        newCard.querySelector('input[name = "content"]').value = cardObject.content;

        newCard.querySelector('input[name="color"]').value = cardObject.color;
        //to attribute the id from the API to the cards 
        newCard.querySelector('.box').dataset.cardId=cardObject.id;

        //to attribut this id to the hiden part
        newCard.querySelector('form input [name="id"]').value = cardObject.id;
        
        newCard.querySelector('.box').style.backgroundColor = cardObject.color;

        newCard.querySelector('.edit-card-icon').addEventListener('click', cardModule.showEditCardForm);
        // submit of form edition
        newCard.querySelector('.edit-card-form').addEventListener('submit', cardModule.handleEditCardForm);

        newCard.querySelector('.delete-card-icon').addEventListener('click', cardModule.deleteCard);

        
        const parentListId=cardObject.list_id;
        
        const theGoodListElem =document.querySelector(`[data-list-id="${parentListId}"]`);
        
        theGoodListElem.querySelector('.panel-block').appendChild(newCard);
          },
    
     showEditCardForm(event) {
            const cardElem = event.target.closest('.box');
            cardElem.querySelector('.card-name').classList.add('is-hidden');
           cardElem.querySelector('.edit-card-form').classList.remove('is-hidden');
        },
    
   async handleEditCardForm(event) {
        event.preventDefault();

        const editFormElem = event.target;
        const formDataObject = new FormData(editFormElem);

        const cardId = formDataObject.get('id');

        const cardContent = editFormElem.previousElementSibling;

        try {
            const response = await fetch(`${utilsModule.base_url}/cards/${cardId}`, {
                method: 'PATCH',
                body: formDataObject
            });

            console.log(response);

            if (!response.ok) throw new Error(response);

            const json = await response.json();
            cardContent.textContent = json.content;

            newCard.querySelector('.box').style.backgroundColor = json.color;

        } catch (error) {
            alert("Impossible to edit the card content");
            console.error(error);
        }

        //in every case hide the form
        editFormElem.classList.add('is-hidden');
        cardContent.classList.remove('is-hidden');
    },

    async deleteCard(event){
        const cardElem = event.target.closest('.box');
        const cardId = cardElem.dataset.cardId;
        const deleteConfirmed=confirm('Are you sure you went to supress this card ?')
        try {
            const response = await fetch(`${utilsModule.base_url}/cards/${cardId}`, {
                method: 'DELETE'
            });

            console.log(response);

            if (!response.ok) throw new Error(response);

            cardElem.remove();

        } catch (error) {
            alert("Impossible to supress the card");
            console.error(error);
        }
    },

    handleDragCard(event) {
        const originListElem = event.target;
        let allCardsFromOriginList = originListElem.querySelectorAll('.box');
        cardModule.updateAllCardsFromOneList(allCardsFromOriginList);
    
    },

     updateAllCardsFromOneList(event) {
        cards.forEach(async(cardElem, cardIndex) =>{ 
            const formDataObject = new FormData ();
            formDataObject.set('position', cardIndex);

    const cardId = cardElem.dataset.cardId;

            // on apelle l'API pour mettre à jour les cartes
            try {
                const response = await fetch(`${utilsModule.base_url}/cards/${cardId}`, {
                    method: 'PATCH',
                    body: formDataObject
                });

                if (!response.ok) throw new Error(response);

            } catch (error) {
                alert("Impossible to move the card.");
                console.error(error);
            }
        })
    }
};