const BDAPPRENANT = "bdWebApp";

/**
 * Fonction qui retourne la Base de donnees 
 * LA Base de donnees du navigateur est espace ou on stocke les objets JS (objet a cle - valeur)
 * Dans notre contexte, nous avons creer la cle "BdApprenant"
 */
function getLocalBD() {
    if (!localStorage.getItem(BDAPPRENANT)) {
        localStorage.setItem(BDAPPRENANT, JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(BDAPPRENANT))

}

/**
 * Fonction mise a jour de la BD
 */

function miseAjourBD(bd) {
    localStorage.setItem(BDAPPRENANT, JSON.stringify(bd));
}

/**
 * Fonction Afficher la liste des apprenants
 */
function recupListeApprenant() {
    return getLocalBD()
}

/**
 * Fonction d'ajout d'un apprenant
 */
function ajoutApprenant(apprenantAjout) {
    const BD = getLocalBD()
    apprenantAjout.id = Date.now()+""
    BD.push(apprenantAjout)
    miseAjourBD(BD)
}

/**
 * Fonction modification d'un apprenant
 * la fonction "map" permet de modifier une collection
 */
function modifApprenant(apprenantModif) {
    const bd = getLocalBD();
    const modifBd = bd.map(function (apprenantCourant) {
        if (apprenantCourant.id == apprenantModif.id) {
            return {
                nom: apprenantModif.nom,
                prenom: apprenantModif.prenom,
                dateNaissance: apprenantModif.dateNaissance,
                niveau: apprenantModif.niveau,
                id:apprenantModif.id
            }
        }
        return apprenantCourant
    })
    miseAjourBD(modifBd)
}

/**
 * Fonction suppression d'un apprenant
 * la fonction "filter" permet de filtrer une collection
 */
function supApprenant(apprenantSup) {
    const bd = getLocalBD();
    const modifBd = bd.filter(function (apprenantCourant) {
        return apprenantCourant.id != apprenantSup.id

    })
    miseAjourBD(modifBd);
}

/**
 * Fonction recupere un apprenant
 * la fonction "filter" permet de filtrer une collection
 */
function recupApprenant(id) {
    const bd = getLocalBD();
    let filtreBD = bd.filter((data) => data.id == id)
    if (filtreBD.length > 0) {
        return filtreBD[0]
    }
    else{

        return null
    }
}

/**
 * Fonction rechercher un apprenant
 * la fonction "filter" permet de filtrer une collection
 */
function rechercheApprenant(nom) {
    const bd = getLocalBD();
    let filtreBD = bd.filter((data) => {
        return data.nom.toLowerCase().includes(nom.toLowerCase()) || data.prenom.toLowerCase().includes(prenom.toLowerCase())
    })
    if (filtreBD.length > 0) {
        return filtreBD[0]
    }
    return null
}

function verifSiApprenant(nom, prenom){
    const db = getLocalBD()
    const filteredDb = db.filter((data)=>{
        return data.nom.toLowerCase() == nom.toLowerCase() && data.prenom.toLowerCase() == prenom.toLowerCase()
    })

    //return filteredDb.length
    return filteredDb.length > 0
}