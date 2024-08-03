
async function fetchMedalData() {
    const url = 'https://olympics.com/OG2024/data/CIS_MedalNOCs~lang=ENG~comp=OG2024.json';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const czeData = data['medalNOC'].filter(entry => entry.org === 'CZE' && entry.gender === 'TOT' && entry.sport === 'GLO');
        console.log({czeData})

        displayMedalData(czeData[0]);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayMedalData(data) {
    const zlato = document.getElementById('zlato');
    zlato.innerHTML = `<h2>🥇 ${data.gold}</h2>`;
    const stribro = document.getElementById('stribro');
    stribro.innerHTML = `<h2>🥈 ${data.silver}</h2>`;
    const bronz = document.getElementById('bronz');
    bronz.innerHTML = `<h2>🥉 ${data.bronze}</h2>`;
    const total = document.getElementById('celkem');
    total.innerText = data.total;

    const titleElement = document.querySelector('head > title');
    titleElement.innerText = `${titleElement.innerText} (${data.total})`

}

fetchMedalData();
