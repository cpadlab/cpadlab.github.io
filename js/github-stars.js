const stars_username = '14wual';
const stars_apiUrl = `https://api.github.com/users/${stars_username}/repos`;
    
let totalStars = 0;
    
fetch(stars_apiUrl)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
    });
    document.querySelector('#stars').textContent = `${totalStars} stars`;
  });