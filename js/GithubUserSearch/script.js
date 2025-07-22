document.addEventListener('DOMContentLoaded', function() {

  const form = document.querySelector("form");
  const inputText = document.getElementById("inputTxt");
  const profileImage = document.getElementById("img")
  const displayUserName = document.getElementById("line1")
  const displayUserBio = document.getElementById("line2")
  const displayUserLocation = document.getElementById("line3")
  const displayUserPubrep = document.getElementById("line4")
  const displayUserFallowers = document.getElementById("line5")
  const displayUserFollowing = document.getElementById("line6")
  const displayUserProfileBtn = document.getElementById("viewbtn")
  const card = document.getElementById("card");
  function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
  form.addEventListener("submit", async function(event) {
    event.preventDefault(); 
    let userName = inputText.value.trim();
      
    if (!userName) return;

    card.style.display = "block";
    card.classList.add("loading");
    await delay(1500);
    

      
    userName = userName.replace(/\s+/g, '-');
      
    try {
      const userData = await fetchUserData(userName);

      card.classList.remove("loading");
      displayUserData(userData);
    } catch (error) {
      console.error(error);

      card.classList.remove("loading");
      card.innerHTML = `<div class="error">User not found or error occurred</div>`;
    }
      
  });


  async function fetchUserData(userName){

    const url = `https://api.github.com/users/${userName}`;

    console.log(url);

    const response = await fetch(url);

    console.log(response);

    if(!response.ok){
        throw new Error("User Not found");
    }
    const data = await response.json();
    return data

  }

  function displayUserData(data) {
    console.log(data);
    const{avatar_url, login, bio, location, public_repos, followers, following, html_url} = data
    
    // Fix image container - make it bigger
    const imgDiv = document.getElementById("img");
    imgDiv.innerHTML = ''; 
    imgDiv.style.position = 'relative';
    imgDiv.style.width = '150px'; // Increased from 120px
    imgDiv.style.height = '150px'; // Increased from 120px
    imgDiv.style.margin = '0 auto';
    imgDiv.style.overflow = 'hidden';
    imgDiv.style.borderRadius = '50%'; // Make container itself circular

    // This is important - completely remove the pseudo-element background
    imgDiv.style.setProperty('background', 'none', 'important');

    // Add this to directly target and hide the pseudo-element
    const style = document.createElement('style');
    style.textContent = `
        #img::before {
            display: none !important;
            background: none !important;
            content: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Create and style the profile image
    const profileImg = document.createElement("img");
    profileImg.src = avatar_url;
    profileImg.alt = login;
    profileImg.style.width = '100%';
    profileImg.style.height = '100%';
    profileImg.style.borderRadius = '50%'; // Make it circular
    profileImg.style.objectFit = 'cover'; // Prevent stretching
    imgDiv.appendChild(profileImg);
    
    // Add CSS to hide all pseudo-elements in the card
    const style2 = document.createElement('style');
    style2.textContent = `
        #card.loaded .img::before,
        #card.loaded .line::before,
        #card.loaded .btn::before {
            display: none !important;
        }
    `;
    document.head.appendChild(style2);
    
    // Mark the card as loaded (for the CSS above)
    card.classList.remove("loading");
    card.classList.add("loaded");
    
    // Fix line elements
    const lineElements = [
        {el: displayUserName, text: `Name: ${login}`},
        {el: displayUserBio, text: `Bio: ${bio || 'Not available'}`},
        {el: displayUserLocation, text: `Location: ${location || 'Not available'}`},
        {el: displayUserPubrep, text: `Public Repos: ${public_repos}`},
        {el: displayUserFallowers, text: `Followers: ${followers}`},
        {el: displayUserFollowing, text: `Following: ${following}`}
    ];
    
    lineElements.forEach(({el, text}) => {
        el.innerHTML = ''; 
        el.style.background = 'white'; // Set explicit white background
        el.style.height = 'auto';
        el.style.padding = '8px';
        el.style.margin = '8px 0';
        el.style.borderRadius = '8px';
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        el.style.color = '#333';
        el.textContent = text;
    });
    
    // Fix button styling
    const btnDiv = document.getElementById("viewbtn");
    btnDiv.innerHTML = '';
    btnDiv.style.background = '#2563eb';
    btnDiv.style.height = 'auto';
    btnDiv.style.borderRadius = '25px';
    btnDiv.style.overflow = 'visible';
    
    const viewLink = document.createElement("a");
    viewLink.href = html_url;
    viewLink.target = "_blank";
    viewLink.textContent = "View Profile";
    viewLink.style.color = "white";
    viewLink.style.display = "block";
    viewLink.style.textAlign = "center";
    viewLink.style.padding = "10px";
    viewLink.style.textDecoration = "none";
    btnDiv.appendChild(viewLink);
}
  
});