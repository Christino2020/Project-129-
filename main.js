function setup(){
    canvas = createCanvas(450, 450)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}
harryPotter = "";
yesterday = "";

function preload(){
    harryPotter = loadSound("hp.mp3")
    yesterday = loadSound("yesterday.mp3") 
     
}
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0 
rightWristX = 0
leftWristY = 0
rightWristY = 0

function modelLoaded(){
    console.log('Posenet is ready')
}


function draw(){
    image(video, 0, 0, 450, 450)
    fill("red")
    stroke("red")

    if (scoreLeftWrist > 0.2 && scoreRightWrist < 0.2 && harryPotter.isNotPlaying()){
        document.getElementById("Results").innerHTML = "Yesterday"
        yesterday.play()

    }
 if(scoreLeftWrist > 0.2 && scoreRightWrist < 0.2 && harryPotter.isPlaying()){
     document.getElementById("Results").innerHTML = "Yesterday"
     harryPotter.stop()
     yesterday.play()
 }
 if (scoreRightWrist > 0.2 && scoreLeftWrist < 0.2 && yesterday.isNotPlaying()){
    document.getElementById("Results").innerHTML = "Yesterday"
    harryPotter.play()

}
if(scoreRightWrist > 0.2 && scoreLeftWrist < 0.2 && yesterday.isPlaying()){
 document.getElementById("Results").innerHTML = "Yesterday"
 yesterday.stop()
 harryPotter.play()
}
   

}

function gotPoses(results){
    if (results.length > 0){
console.log(results)
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist)

rightWristX = results[0].pose.rightWrist.x
leftWristX = results[0].pose.leftWrist.x
rightWristY = results[0].pose.rightWrist.y
leftWristY = results[0].pose.leftWrist.y
console.log("leftWristY = "+ leftWristY+ "rightWristY = " + rightWristY + "rightWristX = " + rightWristX + "leftwristX = "+ leftWristX)

    }
}

