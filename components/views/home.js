import { getGenders } from "../../firebase/db-calls.js"

export const Home = () => {

    getGenders().then((genders) => {

        setTimeout(()=>{
            document.querySelector("#spinnerdiv").style.display = "none";
            document.querySelector("nav").style.pointerEvents = "visible";
        }, 2500)
        

        let landingContainer 
    
        if (document.querySelector(".imgPrincipales")) {
          landingContainer  = document.querySelector(".imgPrincipales")
        }
    
        const setGenders = () => {
          
          genders.forEach((el) => {
          /* Destrucuring sobre el objeto */
    
          const { name, img, id } = el;
    
          const card = document.createElement('div');
          card.className = "col-10 col-sm-4 mb-3"
          card.innerHTML = 
          ` <a reference="${name}" style="cursor:pointer">
                <div class="landingpageimg" style="background-image: url('${img}')" reference="${name}">
                    <p reference="${name}" class="fontzing">${name.toUpperCase()}</p>
                </div>
            </a>
          `
          landingContainer.appendChild(card);
        });
    
        }
    
        setGenders();
    })

    return (
            `<div class="container-fluid pt-3">
            <div class="row">
                <div class="col-12 titleContent">
                    <h3 class="title">LUCCA</h3>
                </div>
                <div class="col-12 d-flex justify-content-evenly flex-wrap imgPrincipales">
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