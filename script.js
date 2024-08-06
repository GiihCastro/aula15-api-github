document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
    const repositoriesUl = document.getElementById('repositories');

    document.getElementById('avatar').src = '';
    document.getElementById('name').textContent = '';
    document.getElementById('bio').textContent = '';
    repositoriesUl.innerHTML = '';

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Usuário não encontrado');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('avatar').src = user.avatar_url;
            document.getElementById('name').textContent = user.name || 'Nome não disponível';
            document.getElementById('bio').textContent = user.bio || 'Biografia não disponível';

            // Busca os repositórios
            return fetch(user.repos_url);
        })
        .then(response => response.json())
        .then(repositories => {
            repositories.forEach(repo => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.textContent = repo.name;
                link.target = '_blank';
                li.appendChild(link);
                repositoriesUl.appendChild(li);
            });

            profileDiv.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
            profileDiv.style.display = 'none';
        });
});
