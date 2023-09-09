const base = getLocalBD()
miseAjourBD(base)
const verifChamp = (obj) => {
    let estVide = false;
    for (const prop in obj) {
        if (obj[prop] == "") {
            estVide = true;
        }
    }
    return estVide;
};

const afficheMessageSucces = (message) => {

    /* Swal.fire({
         position: 'center',
         //position: 'top-end',
         icon: 'success',
         title: message,
         showConfirmButton: false,
         timer: 1500
     })*/
    Swal.fire(message)
}
/* const confirmeSupApprenant = () => {

    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    }) 

}*/

function confirmerSup(){
    let reponse = confirm('Voulez-vous supprimer cet apprenant');
    if(reponse){
        return true
    }
    else{
        return false
    }
}

const app = {
    data() {
        return {
            afficherAccueil: false,
            afficherListe: false,
            afficherEditer: false,
            apprenant: {
                nom: "",
                prenom: "",
                dateNaissance: "",
                niveau: "",
                id: -1
            },
            listeApprenant: [],
            niveau: [
                { 'num': 1, 'dip': 'CEP' },
                { 'num': 2, 'dip': 'BEPC' },
                { 'num': 3, 'dip': 'PROBATOIRE' },
                { 'num': 4, 'dip': 'BACCALAUREAT' },
                { 'num': 5, 'dip': 'BTS / DUT' },
                { 'num': 6, 'dip': 'LICENCE' },
                { 'num': 7, 'dip': 'MASTER 1' },
                { 'num': 7, 'dip': 'MASTER 2 / INGENIEUR' },
                { 'num': 7, 'dip': 'DOCTORAT' }
            ]
        }
    },

    mounted() {
        this.changerEtatNavigation("Accueil");
    },
    BeforeUpdate() {
        this.changerEtatNavigation("Editer");
    },
    Updated() {
        this.changerEtatNavigation("Editer");
    },

    methods: {
        ouvrirAccueil() {
            this.changerEtatNavigation("Accueil");
        },
        ouvrirListe() {
            this.changerEtatNavigation("Liste");
            this.listeApprenant = recupListeApprenant();
        },
        ouvrirEditer() {            
            this.changerEtatNavigation("Editer");
        },

        changerEtatNavigation(cible) {
            this.afficherAccueil = false;
            this.afficherListe = false;
            this.afficherEditer = false;

            switch (cible) {
                case "Accueil":
                    this.afficherAccueil = true;
                    break;
                case "Liste":
                    this.afficherListe = true;
                    break;
                case "Editer":
                    this.afficherEditer = true;
                    break;
                default:
                    this.afficherAccueil = true;
                    break;
            }
        },

        rechercheApprenant(id) {
            this.apprenant = recupApprenant(id)
            this.ouvrirEditer()
        },

        editerApprenant() {
            if (!verifChamp(this.apprenant)) {
                if (this.apprenant.id < 0) {
                    if (!verifSiApprenant(this.apprenant.nom, this.apprenant.prenom)) {
                        ajoutApprenant(this.apprenant);
                        this.apprenant = {
                            nom: "",
                            prenom: "",
                            dateNaissance: "",
                            niveau: "",
                            id: -1
                        }
                        afficheMessageSucces("Apprenant ajoute !!!")
                        this.ouvrirListe();
                    }
                    else {
                        afficheMessageSucces("Cet Apprenant existe deja !!!")
                        this.apprenant = {
                            nom: "",
                            prenom: "",
                            dateNaissance: "",
                            niveau: "",
                            id: -1
                        }
                        this.ouvrirListe();
                    }
                }
                else {
                    modifApprenant(this.apprenant);
                    afficheMessageSucces("Apprenant edite !!!")
                    this.apprenant = {
                        nom: "",
                        prenom: "",
                        dateNaissance: "",
                        niveau: "",
                        id: -1
                    }
                    this.ouvrirListe();
                }

            }
            else {
                afficheMessageSucces("Veillez remplir tous les champs !!!")
            }
            
        },
        supprimerApprenant(apprenant) {
            //console.log('Apprenant supprime'())
            let decision = confirmerSup()
            if(decision){
                supApprenant(apprenant)
                alert('Suppression effectuee avec succes')
                this.listeApprenant = recupListeApprenant();
            }
            else{
                alert('Suppression annulee');
            }
           /*  if (confirmeSupApprenant()) {
                console.log('Apprenant supprime'())
                //supApprenant(apprenant)
            }
            else {
                //return null
                console.log('Operation annulee'())
            } */
        }

    }
}

Vue.createApp(app).mount("#app")