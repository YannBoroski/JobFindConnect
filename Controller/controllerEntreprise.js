document.addEventListener('DOMContentLoaded', function() {
    const entrepriseId = new URLSearchParams(window.location.search).get('id');
    fetchEntrepriseData(entrepriseId);
});
    function fetchEntrepriseData(entrepriseId){ 
    fetch(`../api/Company/apiEntrepriseShow.php?id=${entrepriseId}`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error while trying to retrieve.');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.length > 0) {
            displayEntrepriseData(data[0]);
        } else {
            displayErrorMessage();
        }
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation.", error.message);
    });
    }

function displayEntrepriseData(entreprise) {
    const cardBody = document.getElementById('card-body-entreprise');
    const content = generateEntrepriseContent(entreprise);
    cardBody.innerHTML = content;
    handleDescriptionDisplay();
}

function generateEntrepriseContent({ nom, URL, description, Logo, Secteur_activitee, taille, date_de_fondation, siegeSocial, mail, phone, estVerifiee, adresseSiPasSiegeSocial }) {
    return `
    <div class="container mt-5" style="background-color: #F5F5F5;">
        <div class=" d-flex justify-content-end">
                <img src="../img/imgCompanies/${Logo || '#'}" alt="Logo" id="entreprise-logo" class="img-fluid rounded-circle shadow" style="max-width: 200px;">
        </div>
        <div class="card-body" id="card-body-entreprise">
            <h2>${nom || "Name"}</h2>
            <h6><a href="${URL || '#'}">${URL || ''}</a></h6> <div class="row mb-4">
                <div class="col-md-6">
                    <p class="description">${description || "Description"}</p>
                </div>
            </div>

            <hr>

            <div class="row mt-4">
                <div class="col-md-6">
                    <strong>Industry:</strong> <span id="entreprise-secteur">${Secteur_activitee || ''}</span>
                    <br>
                    <strong>Size:</strong> <span id="entreprise-taille">${taille || ''}</span>
                    <br>
                    <strong>Creation date:</strong> <span id="entreprise-date-fondation">${date_de_fondation || ''}</span>
                    <br>
                    <strong>Headquarters:</strong> <span id="entreprise-siegeSocial">${siegeSocial || ''}</span>
                </div>
                <div class="col-md-6">
                    <span id="entreprise-mail">${mail || ''}</span>
                    <br>
                    <strong>Phone:</strong> <span id="entreprise-phone">${phone || ''}</span>
                    <br>
                    <strong>Verified:</strong> <span id="entreprise-estVerifiee">${estVerifiee !== undefined && estVerifiee !== null ? (estVerifiee ? "Oui" : "Non") : ''}</span>
                </div>
            </div>
            <hr>
        </div>
    </div>
    `;
}

function handleDescriptionDisplay() {
    const descElement = document.querySelector('.description');
    const parentElement = descElement.parentElement;

    const lineHeight = parseInt(window.getComputedStyle(descElement).lineHeight);
    const maxHeight = 6 * lineHeight;

    if (descElement.scrollHeight > maxHeight) {
        descElement.style.height = `${maxHeight}px`;
        descElement.style.overflow = 'hidden';

        const showMoreBtn = document.createElement('button');
        showMoreBtn.innerText = 'Show more';
        showMoreBtn.className = 'btn btn-primary mt-2 show-more-button';

        parentElement.style.display = 'flex';
        parentElement.style.flexDirection = 'column';
        parentElement.style.alignItems = 'center';
        parentElement.style.width = '100%';

        parentElement.appendChild(showMoreBtn);

        showMoreBtn.addEventListener('click', () => {
            if (descElement.style.height === `${maxHeight}px`) {
                descElement.style.height = 'auto';
                showMoreBtn.innerText = 'Show less';
            } else {
                descElement.style.height = `${maxHeight}px`;
                showMoreBtn.innerText = 'Show more';
            }
        });
    }

    descElement.style.width = '100%';
    descElement.style.margin = '0 auto';
}

function displayErrorMessage() {
    const cardBody = document.getElementById('card-body-entreprise');
    cardBody.innerHTML = "<p>The company was not found.</p>";
}