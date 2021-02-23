function likeImage(elem) {
    var id = elem.getAttribute('data-id')
    var liked = JSON.parse(localStorage.getItem('liked'))

    if (liked == null) {
        localStorage.setItem('liked', JSON.stringify([]))
        liked = JSON.parse(localStorage.getItem('liked'))
    }
    if (liked.indexOf(id) >= 0) {
        liked.splice(liked.indexOf(id), 1)
        elem.classList.remove('bi-heart-fill')
        elem.classList.add('bi-heart')
        elem.parentElement.children[0].innerText = parseInt(elem.parentElement.children[0].innerText) - 1
        $.post('/likes', { id: id, method: 'remove' })

    } else {
        elem.classList.add('bi-heart-fill')
        elem.classList.remove('bi-heart')
        liked.push(id)
        elem.parentElement.children[0].innerText = parseInt(elem.parentElement.children[0].innerText) + 1
        $.post('/likes', { id: id, method: 'add' })
    }
    localStorage.setItem('liked', JSON.stringify(liked))
    adjustLikes()
}

(function () {

    adjustLikes()
})()

function adjustLikes() {
    var liked = JSON.parse(localStorage.getItem('liked'))
    document.querySelectorAll('.bi-heart-fill').forEach(function (e) {
        if (liked == null || liked.indexOf(e.getAttribute('data-id')) < 0) {
            e.classList.remove('bi-heart-fill')
            e.classList.add('bi-heart')
        }
    })
}

function openNeighborhoods(elem) {
    document.querySelector('#allNeighborhoods').classList.toggle('d-none')
    console.log(this)
    if (elem.innerHTML == 'השכונות שלנו <i class="bi bi-chevron-down"></i>')
        elem.innerHTML = 'השכונות שלנו <i class="bi bi-chevron-up"></i>'
    else
        elem.innerHTML = 'השכונות שלנו <i class="bi bi-chevron-down"></i>'
}