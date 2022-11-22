const listModule = {

    showAddTag(){
        document.getElementById('addListModal').classList.add('is-active');
        document.querySelector("#addListModal .input").focus();
        },
    
   };

module.exports = listModule;