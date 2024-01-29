document.addEventListener('DOMContentLoaded', function() {
    const profileId = new URLSearchParams(window.location.search).get('id');
    fetchProfileData(profileId);
});

function fetchProfileData(profileId){ 
    fetch(`../api/User/apiProfil.php?id=${profileId}`, {
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
            displayProfileData(data[0]);
        } else {
            displayErrorMessage();
        }
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation.", error.message);
    });
}

function displayProfileData(profile) {
    const cardBody = document.getElementById('card-body-profile');
    const content = generateProfileContent(profile);
    cardBody.appendChild(content);
}

function generateProfileContent({ username, firstname, lastname, mail, phone_number, date_de_naissance, pfp, bio, statutVisibilitee, isVerified, urlCV, profileLinkedin, role }) {
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    container.style.transition = 'transform 0.5s ease';
    container.addEventListener('mouseenter', () => {
      container.style.transform = 'scale(1.1)';
    });
    container.addEventListener('mouseleave', () => {
      container.style.transform = 'scale(1)';
    });
  
    const row1 = document.createElement('div');
    row1.classList.add('d-flex', 'justify-content-center');
  
    const img = document.createElement('img');
    img.src = `../img/imgPFP/${pfp || '#'}`;
    img.alt = 'Profile picture';
    img.id = 'profile-picture';
    img.classList.add('img-fluid', 'rounded-circle', 'shadow');
    img.style.maxWidth = '200px';
    img.style.border = '5px solid white';
    img.style.transition = 'transform 0.5s ease';
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  
    row1.appendChild(img);
  
    const row2 = document.createElement('div');
    row2.classList.add('card-body');
    row2.id = 'card-body-profile';
  
    if (statutVisibilitee === 'Private') {
      row2.innerHTML = '';
      row2.appendChild(img);
      const h6 = document.createElement('h6');
      h6.textContent = `@${username || ''}`;
      h6.style.textAlign = 'center';
      row2.appendChild(h6);
      const p3 = document.createElement('p');
      p3.classList.add('description');
      p3.style.fontSize = '1.2rem';
      p3.innerHTML = '<strong>Visibility status:</strong> PRIVATE';
      p3.style.textAlign = 'center';
      row2.appendChild(p3);
    } else {
      const h2 = document.createElement('h2');
      h2.textContent = `${firstname || ''} ${lastname || ''}`;
      h2.style.marginTop = '20px';
      h2.style.textAlign = 'center';
  
      const h6 = document.createElement('h6');
      h6.textContent = `@${username || ''}`;
      h6.style.textAlign = 'center';
  
      const row3 = document.createElement('div');
      row3.classList.add('row', 'mb-4');
  
      const col1 = document.createElement('div');
      col1.classList.add('col-md-12');
  
      const p1 = document.createElement('p');
      p1.classList.add('description');
      p1.textContent = bio || 'Bio';
      p1.style.textAlign = 'center';
      p1.style.marginTop = '20px';
      p1.style.marginBottom = '20px';
      p1.style.fontSize = '1.2rem';
  
      col1.appendChild(p1);
  
      row3.appendChild(col1);
  
      const hr1 = document.createElement('hr');
  
      const row4 = document.createElement('div');
      row4.classList.add('row', 'mt-4');
  
      const col2 = document.createElement('div');
      col2.classList.add('col-md-6');
  
      const p2 = document.createElement('p');
      p2.classList.add('description');
      p2.style.fontSize = '1.2rem';
      p2.innerHTML = `<strong>Email:</strong> ${mail || ''}<br><strong>Phone:</strong> ${phone_number || ''}<br><strong>Date of birth:</strong> ${date_de_naissance || ''}`;
      col2.appendChild(p2);
  
      row4.appendChild(col2);
  
      const col3 = document.createElement('div');
      col3.classList.add('col-md-6');
  
      const p3 = document.createElement('p');
      p3.classList.add('description');
      p3.style.fontSize = '1.2rem';
      p3.innerHTML = `<strong>Visibility status:</strong> ${statutVisibilitee !== undefined && statutVisibilitee !== null ? (statutVisibilitee === 'Private' ? 'PRIVATE' : 'Public') : ''}`;
      col3.appendChild(p3);
  
      row4.appendChild(col3);
  
      const hr2 = document.createElement('hr');
  
      const row5 = document.createElement('div');
      row5.classList.add('row', 'mt-4');
  
      const col4 = document.createElement('div');
      col4.classList.add('col-md-6');
  
      if (isVerified === 1) {
        const p4 = document.createElement('p');
        p4.classList.add('description');
        p4.style.fontSize = '1.2rem';
        p4.innerHTML = '<strong>Verified:</strong> ✔';
        col4.appendChild(p4);
      }
  
      if (urlCV && urlCV !== '0') {
        const p5 = document.createElement('p');
        p5.classList.add('description');
        p5.style.fontSize = '1.2rem';
        p5.innerHTML = `<strong>CV:</strong> <a href="${urlCV}" target="_blank">View CV</a>`;
        col4.appendChild(p5);
      }
  
      row5.appendChild(col4);
  
      const col5 = document.createElement('div');
      col5.classList.add('col-md-6');
  
      if (profileLinkedin && profileLinkedin !== '0') {
        const p6 = document.createElement('p');
        p6.classList.add('description');
        p6.style.fontSize = '1.2rem';
        p6.innerHTML = `<strong>LinkedIn:</strong> <a href="${profileLinkedin}" target="_blank">View profile</a>`;
        col5.appendChild(p6);
      }
  
      row5.appendChild(col5);
  
      const hr3 = document.createElement('hr');
  
      const row6 = document.createElement('div');
      row6.classList.add('row', 'mt-4');
  
      const col6 = document.createElement('div');
      col6.classList.add('col-md-12');
  
      const p7 = document.createElement('p');
      p7.classList.add('description');
      p7.style.fontSize = '1.2rem';
      p7.innerHTML = `<strong>Role:</strong> <span id="profile-role">${role || ''}</span>`;
      p7.style.color = role === 'Admin' ? 'red' : 'inherit';
      col6.appendChild(p7);
  
      row6.appendChild(col6);
  
      row2.appendChild(h2);
      row2.appendChild(h6);
      row2.appendChild(row3);
      row2.appendChild(hr1);
      row2.appendChild(row4);
      row2.appendChild(hr2);
      row2.appendChild(row5);
      row2.appendChild(hr3);
      row2.appendChild(row6);
    }
  
    container.appendChild(row1);
    container.appendChild(row2);
  
    return container;
  }

function displayErrorMessage() {
    const cardBody = document.getElementById('card-body-profile');
    const p = document.createElement('p');
    p.textContent = 'The profile was not found.';
    cardBody.appendChild(p);
}