
console.log('content script', this, document)

function createNewImage (imageUrl) {
    let newImage = document.createElement("img")
    newImage.src = imageUrl
    newImage.style = `
        top: 0px;
        left: 0px;
        z-index: 2000;
        height: 100vh;
        width: auto;
        opacity: .15;
    `
    document.body.appendChild(newImage)
    console.log(newImage)
}
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "newImage":
                createNewImage(message.imageUrl)
            break
        }
    }
)