const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

function sendImage() {
    const file = document.getElementById('inputFile').files[0]
    toBase64(file).then(resp => {

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: "newImage",
                    imageUrl: resp
                })
        })
    })
}

document.getElementById('triggerButton').addEventListener('click', sendImage)