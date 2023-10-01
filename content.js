console.log("Hi, I have been injected whoopie!!!")

// 
var recorder = null
function onAccessApproved(stream) {
    // here 
    recorder = new MediaRecorder(stream);
    // Arrays to store video and audio data
    let videoChunks = [];
    let audioChunks = [];
    console.log("videoChunks:", videoChunks);
    recorder.start(1000);
    recorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
                track.stop()
            }
        })
    }
    recorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            console.log("inside event size");
            if (event.data.type === 'video/x-matroska;codecs=avc1') {
                // 'video/webm;codecs=vp8'
                console.log("inside type condition")
                videoChunks.push(event.data);
                console.log("eventdata:", event.data);
            } else if (event.data.type === 'audio/webm') {
                audioChunks.push(event.data);
            }
            else{
                console.log("not match")
            }
        }
        console.log("video-chunks:", videoChunks);
        let recordedBlob = event.data;
        // sendChunkToBackend(recordedBlob);
        console.log("recordedBlob has been assigned")
        console.log(recordedBlob)
        // if (recordedBlob.type === 'video/webm') {
        //     console.log("inside recorder if condition");
        //     videoChunks.push(recordedBlob);
        // } else if (recordedBlob.type === 'audio/webm') {
        //     audioChunks.push(recordedBlob);
        // }
        //________________________  this will create a link and save the webm file in local storage ______________________________
        // let url = URL.createObjectURL(recordedBlob);
        // let a = document.createElement("a");
        // a.style.display = "none";
        // a.href = url;
        // a.download = "screen-recording.webm"
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(url);
    }
}
// this is 
function sendChunkToBackend(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'screen-recording.webm');
    fetch('https://example.com/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Chunk sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending chunk:', error);
    });
  }
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "request_recording") {
        console.log("requesting recording")
        sendResponse(`processed: ${message.action}`);
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: {
                width: 9999999999,
                height: 9999999999
            }
        }).then((stream) => {
            onAccessApproved(stream)
        })
    }
    if (message.action === "stopvideo") {
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log("no recorder")
        recorder.stop();
    }
})







