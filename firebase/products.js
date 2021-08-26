import {getFirestore, storage} from './firebase.js'

let db = getFirestore();
let storageRef = storage().ref();
let app = document.querySelector("#app");

export const getCategories = async () => {

    const itemCollection = db.collection('categoriesman')
    const querySnapshot = await itemCollection.get()

    let categories = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }));

    return categories
}

export async function getItems() {

    let allProducts = []

    let products = document.createElement('div');
    products.className = 'container';
    products.style.cssText = 'display: flex ; flex-direction: column ; margin: 5rem'

    const itemCollection = db.collection('products')
    const querySnapshot = await itemCollection.get()

    allProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return allProducts
    /* allProducts.forEach(el=>{
        let prod = document.createElement('div')
        prod.className = 'card'
        prod.setAttribute('id',el.id)
        prod.style = 'width: 12rem;'
        prod.innerHTML = `
        
            <img src="${el.img}" class="card-img-top" style="height: 8rem;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">${el.description}</p>
                <p class="card-text">${el.price}</p>
                <p class="card-text">${el.category}</p>
                <a class="btn btn-warning delete">Delete</a>
                <button type="button" class="btn btn-info editBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Editar
                </button>
            </div>
        `

        products.appendChild(prod)
    }) */

    /* app.appendChild(products) */
}

let editForm = document.querySelector('#editForm')


window.addEventListener('click', async (e)=>{

    let focus = e.target

    if(focus.classList.contains('delete')){

        let id = e.target.parentElement.parentElement.attributes.id.value
        let folder = e.target.parentElement.children[3].innerHTML

        let confirmacion = confirm('Desea eleminar el elemento?')

        if(confirmacion){
        
        let focusImg = storageRef.child(`${folder}/${id}`);
    
        focusImg.delete().then(function() {
            console.log('imagen borrada');
        }).catch(function(error) {
            console.log('error ->', error);
        });

        db.collection('products').doc(id).delete().then(() => {
            console.log('documento eliminado');
            location.reload();
        }).catch((error) => {
            console.error('error ->', error);
        });}
    }

    if (focus.classList.contains('editBtn')){
        
        let id = e.target.parentElement.parentElement.attributes.id.value;

        var docRef = db.collection('products').doc(id);

        await docRef.get().then((doc) => {
            if (doc.exists) {
                let product = (({ ...doc.data(), id: doc.id }))
                const {name, price, description, category} = product

                let categoryLength = editForm[1].length

                for (let i = 0; i < categoryLength; i++) {
                    if ((editForm[1][i].innerHTML) === category){
                        editForm[1].value = i
                    }
                }

                editForm.setAttribute('id', id)
                editForm[0].value = name;
                editForm[2].value = price;
                editForm[3].value = description;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    if (focus.classList.contains('saveEdit')){

        e.preventDefault();
        
        let id = e.target.parentElement.getAttribute('id')

        var docRef = db.collection('products').doc(id);

        let selectedCategory = editForm[1].value;
        let editCategory = editForm[1][selectedCategory].innerHTML

        return docRef.update({
            name: editForm[0].value,
            price: editForm[2].value,
            category: editCategory,
            description: editForm[3].value,
        })
        .then(() => {
            console.log("Document successfully updated!");

            setTimeout(
                location.reload(),
                10000
            )
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
})