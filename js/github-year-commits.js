const year_commits_username = '14wual';
const year_commits_apiUrl = `https://api.github.com/users/${year_commits_username}/events`;
    
fetch(year_commits_apiUrl)
    .then(response => response.json())
    .then(events => {
        const currentYear = new Date().getFullYear();
        const commitsThisYear = events.filter(event => event.type === 'PushEvent' && new Date(event.created_at).getFullYear() === currentYear).length;
        document.querySelector('#commits').textContent = `${commitsThisYear} commits this year`;
  });
