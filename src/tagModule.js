const utilsModule = require("./utilsModule");

const tagModule = {

    makeTagInDom(tag){
        //ceate html element 
        const tagElem = document.createElement('span')
        tagElem.textContent = tag.name;
        tagElem.classList.add('tag');
        tagElem.style.backgroundColor = tag.color;
        tagElem.dataset.tagId = tag.id;
        //insert the tag on the card he belongs
        const parentCardId = tag.card_has_tag.card_id;
        const parentCardElem = document.querySelector(`[data-card-id="${parentCardId}"]`);
        parentCardElem.querySelector('.tags-container').appendChild(tagElem);
        },
    
    async showAssociateTagToCardModale(event){
        const modalElem = document.querySelector('#addTagToCardModal');
     
        modalElem.classList.add('is-active');

        const parentCardElem = event.target.closest('.box');
        const parentCardId = parentCardElem.dataset.cardId;
        modalElem.querySelector('input[name="card_id"]');

        const selectElem = modalElem.querySelector('select');
//to prevent that the list get bigger each time we open the modal
        selectElem.textContent = '';



        try {
            const response = await fetch(`${utilsModule.base_url}/tags`);

            if (!response.ok) throw new Error(response);

            const tagList = await response.json();
            console.log(tagList);

            for (const tag of tagList) {

                const optionElem = document.createElement('option');

                optionElem.textContent = tag.name;

                optionElem.value = tag.id;

                selectElem.appendChild(optionElem);
                
            }

        } catch (error) {
            alert("Impossible to retrieve the list of tags");
            console.error(error);
        }
    },

    async associateTagToCard(event){
  event.preventDefault();
  const formDataObject = new FormData(event.target);
  const cardId = formDataObject.get('card_id');
  const tagId = formDataObject.get('tag_id');

  try {
    const response = await fetch(
        `${utilsModule.base_url}/cards/${cardId}/tags/${tagId}`, {
        method: 'PUT'
    });

    if (!response.ok) throw new Error(response);

  const cardUpdated = await response.json();
  const tagsContainer = document.querySelector(`[data-card-id="${cardId}"] .tags`);
  tagsContainer.textContent = '';

  cardUpdated.tags.forEach((tag) => {
      tagModule.makeTagInDOM(tag)
  });


} catch (error) {
    alert("Impossible to associate the tag to the card");
    console.error(error);
}
utilsModule.hideModals();
    },
    
   };

module.exports = tagModule;