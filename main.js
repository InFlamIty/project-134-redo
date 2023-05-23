img = ""
song = ""
function setup()
{
    canvas = createCanvas(800 , 600)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}
resultsArray = []
function draw()
{
    image(video , 0 , 0 , 800 , 600)
    if (status != "") {
        objectDetector.detect(canvas , gotResults)
        for (let i = 0; i < resultsArray.length; i++) {
            r = random(255)
            g = random(255)
            b = random(255)
            document.getElementById("status").innerHTML = "Object Detected"
            fill(r , g , b)
            textSize(25)
            con = floor(resultsArray[i].confidence * 100)
            text(resultsArray[i].label + con + "%" , resultsArray[i].x , resultsArray[i].y)
            noFill()
            stroke(r , g , b)
            rect(resultsArray[i].x , resultsArray[i].y , resultsArray[i].width , resultsArray[i].height)
            document.getElementById("itemNum").innerHTML = "Amount of Items = " + resultsArray.length
        }
        if (resultsArray[0].label == "person") {
            document.getElementById("babyStat").innerHTML = "Baby Detected"
            song.stop()
        } else {
            song.play()
            document.getElementById("babyStat").innerHTML = "Baby Not Detected"
        }
        if (resultsArray.length == 0) {
            document.getElementById("babyStat").innerHTML = "Baby Not Detected"
            song.play()
        }
    }
}
function preload()
{
    song = loadSound("alarm.mp3")
}
function modelLoaded()
{
    console.log("this should be working and not creating virus")
    status = true
}
status = ""
function gotResults(error , results)
{
    if (error) {
        console.log(error , "i guess its not working :(")
    }
    console.log(results , "if you see this it worked i guess :)")
    resultsArray = results
}
function starter()
{
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded)
    document.getElementById("status").innerHTML = "detecting objects ...."
}