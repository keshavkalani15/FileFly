# FileFly ✈️ | Premium P2P File Transfer

**FileFly** is a high-performance, browser-based peer-to-peer (P2P) file sharing application. It allows users to transfer multiple files securely across different networks using a simple 6-digit alphanumeric code.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://filefly-kkly.onrender.com)

## ✨ Features
- **Direct P2P Transfer:** Files are sent directly between browsers using WebRTC, ensuring privacy and speed.
- **Simultaneous Sharing:** One sender can transmit files to multiple receivers at the same time.
- **6-Digit Codes:** Easy-to-share alphanumeric codes instead of complex UUIDs.
- **Premium UI:** A soft glassmorphism aesthetic built with modern CSS variables.
- **Transfer Stats:** Real-time monitoring of transfer speeds (MB/s) and progress.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Networking:** [PeerJS](https://peerjs.com/) (WebRTC abstraction)
- **Backend:** Flask (Python) for serving the frontend
- **Deployment:** Render (PaaS) with Gunicorn for efficient request handling



## 🚀 How It Works
1. **Signaling:** The app uses a signaling server to exchange 6-digit codes and establish a handshake.
2. **STUN/TURN:** It utilizes STUN servers to bypass NAT and firewalls for global connectivity.
3. **Data Channel:** Once connected, a secure WebRTC DataChannel is opened for binary file transfer.

## 📦 Local Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/keshavkalani15/FileFly.git](https://github.com/keshavkalani15/FileFly.git)

2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Run the application:
   ```bash
   python app.py
   
4. Open http://localhost:5000 in your browser.

📈 Optimization & Scaling
This project is deployed on Render using a gunicorn WSGI server to handle multiple simultaneous signaling requests efficiently. It leverages the PeerJS cloud for global discovery across any internet connection.


Developed with ❤️ by Keshav Kalani
