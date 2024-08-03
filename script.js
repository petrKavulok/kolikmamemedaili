
async function fetchMedalData() {
    // const url = 'https://olympics.com/OG2024/data/CIS_MedalNOCs~lang=ENG~comp=OG2024.json';
    const url = 'https://api.olympics.kevle.xyz/medals?country=cze'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayMedalData(data);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayMedalData(data) {
    const zlato = document.getElementById('zlato');
    zlato.innerHTML = `<h2>🥇 ${data.results[0].medals.gold}</h2>`;
    const stribro = document.getElementById('stribro');
    stribro.innerHTML = `<h2>🥈 ${data.results[0].medals.silver}</h2>`;
    const bronz = document.getElementById('bronz');
    bronz.innerHTML = `<h2>🥉 ${data.results[0].medals.bronze}</h2>`;
    const total = document.getElementById('celkem');
    console.log(data.results[0].medals.total)
    total.innerText = data.results[0].medals.total;
}

fetchMedalData();
