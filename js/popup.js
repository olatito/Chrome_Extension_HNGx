document.addEventListener('DOMContentLoaded', function () {
    let mediaRecorder;
    let stream;

    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');

//     startRecordingButton.addEventListener('click', async function () {
//         stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         mediaRecorder = new MediaRecorder(stream);

//         const chunks = [];
//         mediaRecorder.ondataavailable = event => {
//             chunks.push(event.data);
//         }

//         mediaRecorder.onstop = () => {
//             const blob = new Blob(chunks, { type: 'video/webm' });
//             const url = URL.createObjectURL(blob);
//             sendDataToServer(url); // Implement this function to send data to server
//         }

//         mediaRecorder.start();
//         startRecordingButton.disabled = true;
//         stopRecordingButton.disabled = false;
//     });

//     stopRecordingButton.addEventListener('click', function () {
//         mediaRecorder.stop();
//         stream.getVideoTracks()[0].stop();
//         startRecordingButton.disabled = false;
//         stopRecordingButton.disabled = true;
//     });
// });

    startRecordingButton.addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'request_recording' },
        (response) => {
          if (!chrome.runtime.lastError) {
            console.log(response)
          } else {
            console.log(chrome.runtime.lastError, 'Error line 17')
          }
        }
      )
    })
  })
})



// for appearance

function toggleButtons(activeButton) {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    if (activeButton === 'button1') {
        button1.disabled = true;
        button2.disabled = false;
    } else {
        button1.disabled = false;
        button2.disabled = true;
    }
}

function toggleState() {
    const toggleButton = document.getElementById('toggleButton');
    // Check if the toggle button is checked
    if (toggleButton.checked) {
        // Do something when the toggle button is ON
        console.log('Toggle button is ON');
    } else {
        // Do something when the toggle button is OFF
        console.log('Toggle button is OFF');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', function() {
        // Close the floating window
        window.close();
    });
});