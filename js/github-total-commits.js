const total_commits_username = '14wual';
const total_commits_apiUrl = `https://api.github.com/users/${total_commits_username}/events?type=all`;

fetch(total_commits_apiUrl)
  .then(response => response.json())
  .then(events => {
    const commits = events.filter(event => event.type === 'PushEvent').length;
    document.querySelector('#total').textContent = `${commits} commits this years`;
  });