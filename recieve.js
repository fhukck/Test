const maintext = document.querySelector('h1')
const sectext = document.querySelector('p')
const butt = document.querySelector('button')


// Add event listener to the button
butt.addEventListener('click', () => {
  // Request camera access
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment' // Use back camera
    }
  })
  .then(stream => {
    // Create a video element to display the camera feed
    const video = document.createElement('video');
    document.body.appendChild(video);
    video.srcObject = stream;
    video.play();

    // Use jsQR to detect and read QR codes
    const scanner = new jsQR.Scanner({
      video: video,
      onScan: (code) => {
        // Decrypt the QR code data
        const encryptedData = code;
        const secretKey = "Made_By_BM";
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
         sectext.textContent = encryptedData;
    maintext.textContent = decryptedData;
        // Process the decrypted data
        console.log(decryptedData);
      }
    });
  })
  .catch(error => maintext.textContent = error);
});
