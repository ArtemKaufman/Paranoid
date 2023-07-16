function isUrlValid(url) {
    // RegExp
    const urlPattern = /^(?:http|ftp)s?:\/\/(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;

    return urlPattern.test(url);
}

document.getElementById('urlInput').addEventListener('blur', function() {
    const inputUrl = document.getElementById('urlInput').value;
    const resultMessage = document.getElementById('resultMessage');

    if (isUrlValid(inputUrl) || inputUrl.length === 0) {
        resultMessage.classList.add('hidden')
    } else {
        resultMessage.classList.remove('hidden')
    }
});
