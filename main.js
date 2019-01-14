const $id = document.getElementById('myid')
const $yourid = document.getElementById('yourid')
function useUserMedia() { 
    //check if the browser supports the WebRTC 
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true}, function(stream){
        playStream('mycam', stream)
    }, function(err) { console.log(err)} )
 }
function openStream() {
    const config = {audio: true, video: true}
    return navigator.mediaDevices.getUserMedia(config)
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag)
    video.srcObject = stream
    video.play
}
function call() {
    let yourid = $yourid.value.trim()
    openStream().then(stream=> {
        let call = peer.call(yourid, stream)
        call.on('stream', remoteStream=> {
            playStream('yourcam', remoteStream)
        })
    })
}
let peer = new Peer({key: 'peerjs', host: 'hung-videocall.herokuapp.com', secure: true, port: 443})
peer.on('open', id=> {
    $id.innerText = id
})
//received
peer.on('connection', conn=> {
    conn.on('open', ()=> {
        conn.on('data', data=> {
            console.log(data)
        })
    })
})

peer.on('call', call=> {
    alert("co")
    openStream().then(stream=> {
        call.answer(stream)
        call.on('stream', remoteStream=> {
            playStream("yourcam", remoteStream)
        })
    })
    
})

useUserMedia()