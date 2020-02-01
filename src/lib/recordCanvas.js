const btn = document.querySelector("button"),
  chunks = [];

function record() {
  chunks.length = 0;
  let stream = document.querySelector("canvas").captureStream(60),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = openNewWindowVideo;
  btn.onclick = e => {
    recorder.stop();
    btn.textContent = "start recording";
    btn.onclick = record;
  };
  recorder.start();
  btn.textContent = "stop recording";
}

function openNewWindowVideo(e) {
  var blob = new Blob(chunks);
  open_in_new_window(blob);
}

btn.onclick = record;

function open_in_new_window(videoBlob, features = 'location=1,status=1,toolbar=1,resizeable=1,width=800,height=600') {
  var new_window;

  if (features !== undefined && features !== '') {
    new_window = window.open('', '_blank', features);
  } else {
    new_window = window.open('', '_blank');
  }
  new_window.document.write('<!doctype html><html><head><title>Video Player</title><meta charset="UTF-8" /></head><body style="display: flex; flex-direction: column; align-items: center; justify-content: center;"></body></html>');
  var vid = document.createElement("video");
  vid.id = "recorded";
  vid.controls = true;
  vid.height = 400
  vid.width = 600
  vid.src = URL.createObjectURL(videoBlob);
  new_window.document.body.appendChild(vid);
  vid.play();
}