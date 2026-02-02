// 1. Generate a 6-digit Alpha-Numeric ID
function generateShortID(length = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing O, 0, I, 1
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const myStaticID = generateShortID();
const peer = new Peer(myStaticID, {
    config: {
        'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' }, // Free Google STUN
            { 
                urls: 'turn:your-turn-server-url.com', 
                username: 'your-username', 
                credential: 'your-password' 
            }
        ]
    }
});
let activeConnections = [];

peer.on('open', (id) => {
    console.log('PeerJS initialized with ID:', id);
});

// 2. Sender Logic
function checkFiles() {
    const fileInput = document.getElementById('fileInput');
    const btn = document.getElementById('generateBtn');
    btn.disabled = fileInput.files.length === 0;
}

function generateID() {
    document.getElementById('my-id-display').innerText = peer.id;
    document.getElementById('generateBtn').innerText = "Waiting for connections...";
}

// Handling multiple receivers
peer.on('connection', (conn) => {
    activeConnections.push(conn);
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    conn.on('open', () => {
        document.querySelector('#send-progress').parentElement.style.display = 'block';
        document.getElementById('send-stats').innerText = `Sending ${files.length} file(s) to a new peer...`;
        
        // Loop through all selected files
        Array.from(files).forEach(file => {
            // We send metadata and the file blob
            conn.send({
                file: file,
                filename: file.name,
                filetype: file.type,
                size: file.size
            });
        });

        document.getElementById('send-progress').style.width = '100%';
        document.getElementById('send-stats').innerText = "Status: All files pushed to peer(s).";
    });
});

// 3. Receiver Logic
function connectToPeer() {
    const code = document.getElementById('receiver-id-input').value.trim().toUpperCase();
    if (!code) return alert("Please enter a code");

    const conn = peer.connect(code);
    const startTime = Date.now();

    document.getElementById('receive-stats').innerText = "Connecting...";
    
    conn.on('open', () => {
        document.getElementById('receive-stats').innerText = "Connected! Awaiting files...";
        document.querySelector('#receive-progress').parentElement.style.display = 'block';
    });

    conn.on('data', (data) => {
        // Calculate speed
        const endTime = Date.now();
        const durationInSeconds = (endTime - startTime) / 1000;
        const sizeInMB = data.size / (1024 * 1024);
        const speed = (sizeInMB / durationInSeconds).toFixed(2);

        document.getElementById('receive-stats').innerText = 
            `Received: ${data.filename} (${sizeInMB.toFixed(2)} MB) @ ${speed} MB/s`;
        document.getElementById('receive-progress').style.width = '100%';

        // Trigger Download
        const blob = new Blob([data.file], { type: data.filetype });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
    });

    conn.on('error', (err) => {
        alert("Connection failed. Check the code.");
        console.error(err);
    });
}