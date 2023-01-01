const repositories_username = '14wual';
const repositories_apiUrl = `https://api.github.com/users/${repositories_username}/repos`;

fetch(repositories_apiUrl)
  .then(response => response.json())
  .then(repos => {
    document.querySelector('#repos').textContent = `${repos.length} repositories`;
  });