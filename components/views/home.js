import { getGenders } from "../../firebase/db-calls.js"

export const Home = () => {

    getGenders().then((genders) => {

        setTimeout(()=>{
            if(document.querySelector("#spinnerdiv") !== null)
            {document.querySelector("#spinnerdiv").style.display = "none";
            document.querySelector('#nav').style.pointerEvents = "all"}
          }, 2500)

        let landingContainer 
    
        if (document.querySelector(".imgPrincipales")) {
          landingContainer  = document.querySelector(".imgPrincipales")
        }

        let size

        let completeLanding = document.querySelector('#completeLanding')

        if(genders.length % 2 == 0){
            size = "col-10 col-sm-5 col-lg-4 mb-5"
        } else {
            size = "col-10 col-sm-5 mx-3 mb-5"
            completeLanding.style.display = "block"
        }
        const setGenders = () => {
          
          genders.forEach((el) => {
          /* Destrucuring sobre el objeto */
    
          const { name, background, id } = el;
    
          const card = document.createElement('div');
          card.className = size
          card.innerHTML = 
          ` <a reference="${name}" style="cursor:pointer">
                <div class="landingpageimg" style="background-image: url('${background}')" reference="${name}">
                    <p reference="${name}" class="fontzing">${name.toUpperCase()}</p>
                </div>
            </a>
          `
          landingContainer.prepend(card);
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
                <div id="spinnerdiv">
                    <div class="spinner-border" style="width: 4.5rem; height: 4.5rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="col-10 offset-1 d-flex justify-content-evenly flex-wrap imgPrincipales">
                    <div class="col-10 col-sm-5 mx-3 mb-5" id="completeLanding" style="display: none">
                        <a reference="" style="cursor:pointer">
                            <div class="landingpageimg" style="background-color: white; color:black; text-shadow: none;" reference="">
                                <p reference="" class="fontzing3">BIENVENIDOS</p>
                            </div>
                        </a>
                    </div>
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