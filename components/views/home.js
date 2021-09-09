import { getGenders } from "../../firebase/products.js"

export const Home = () => {

    getGenders().then((products) => {
    
        let landingContainer 
    
        if (document.querySelector(".imgPrincipales")) {
          landingContainer  = document.querySelector(".imgPrincipales")
        }
    
        const setGenders = () => {
          
          products.forEach((el) => {
          /* Destrucuring sobre el objeto */
    
          const { name, img, id } = el;
    
          const card = document.createElement('div');
          card.className = "col-12 col-lg-6 mb-3"
          card.innerHTML = 
          ` <a href="">
                <div class="landingpageimg" style="background-image: url('${img}')" reference="${name}">
                    <p class="fontzing">${name.toUpperCase()}</p>
                </div>
            </a>
          `
          landingContainer.appendChild(card);
        });
    
        }
    
        setGenders();
    })

    return (
            `<div class="container">
            <div class="row">
                <div class="col-12 titleContent">
                    <h3 class="title">LUCCA</h3>
                </div>
                <div class="col-12 d-flex flex-wrap imgPrincipales">
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="col-12">
                <div class="line"></div>
            </div>
        </div>`
    )
}

export default Home;