const url = 'http://localhost:3003'

document.addEventListener('DOMContentLoaded', async () => {
    await loadRemotes();
});

// async function loadRemotes() {
//     try {
//         const response = await fetch(`${url}/api/ir/remotes`);
//         const remotes = await response.json();
//         const remoteSelect = document.getElementById('remote');

//         for (const remote of remotes) {
//             const option = document.createElement('option');
//             option.value = remote;
//             option.textContent = remote;
//             remoteSelect.appendChild(option);
//         }
//     } catch (error) {
//         console.error('Error loading remotes:', error);
//     }
// }

async function discoverTVs() {
    try {
        const response = await fetch(`${url}/api/tv/discover`);
        const devices = await response.json();
        const tvList = document.getElementById('tv-list');
        tvList.innerHTML = '';

        devices.forEach(device => {
            const div = document.createElement('div');
            div.textContent = `${device.name} (${device.address})`;
            div.dataset.ip = device.address;
            div.onclick = () => selectTV(div);
            tvList.appendChild(div);
        });
    } catch (error) {
        console.error('Error discovering TVs:', error);
    }
}

function selectTV(element) {
    const selected = document.querySelector('#tv-list .selected');
    if (selected) {
        selected.classList.remove('selected');
    }
    element.classList.add('selected');
}
