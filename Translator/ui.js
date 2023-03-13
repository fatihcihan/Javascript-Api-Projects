class UI {
    constructor() {
        this.profileContainer = document.querySelector("#profileContainer");
        this.alert = document.querySelector("#alert");
    }

    showProfile(profile) {
        this.profileContainer.innerHTML = `        
            <div class="card card-body">
                <div class="row">
                    <div class="col-md-3">

                    </div>
                    <div class="col-md-9">
                        <h4>Contact</h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                                  name : ${profile.name}
                            </li>
                            <li class="list-group-item">
                                 surname : ${profile.surname}
                            </li>
                            <li class="list-group-item">
                                email : ${profile.email}
                            </li>
                            <li class="list-group-item">
                               address : 
                               ${profile.address.street}
                               ${profile.address.suite}
                               ${profile.address.city}
                               ${profile.address.zipcode}
                            </li>
                            <li class="list-group-item">
                                website : ${profile.website}
                           </li>
                           <li class="list-group-item">
                                company : ${profile.company.name}
                           </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        
        
        
        
        `;
    }

    showAlert(text) {
        this.alert.innerHTML = `${text} is not found. `;
    }

    clear() {
        this.profileContainer.innerHTML = "";
        this.alert.innerHTML = "";
    }

}