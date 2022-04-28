const container = document.querySelector('.allCriminals')
let pageNum = 1

function createList() {
    $.get(`https://api.fbi.gov/wanted/v1/list`, URLSearchParams={'page': pageNum}, (data) => {
        console.log(data.items[0])
        var list = data.items
        for (let i = 0; i < list.length; i++) {
            const span = document.createElement('span')
            const h3 = document.createElement('h3')
            const p = document.createElement('p')
            const p2 = document.createElement('p')
            const a = document.createElement('a')
            const img = document.createElement('img')

            span.className = 'criminal'
            h3.innerText = (`NAME: ${list[i].title}`).toLowerCase()

            if (list[i].reward_text !== null) {
                p.innerText = `Reward: ${list[i].reward_text}`
            }

            p2.innerText = `Subject: ${list[i].subjects[0]}`
            a.href = `${list[i].url}`
            a.innerText = 'FBI Record'

            if (list[i].status == 'captured') {
            img.src = "https://c.tenor.com/BzsHzUDkldMAAAAd/caught-flash.gif"
            img.className = "caught"

            } else {

                img.src = list[i].images[0].original
                img.className = "at-large"
            }

            span.appendChild(img)
            h3.appendChild(p)
            h3.appendChild(p2)
            span.appendChild(h3)
            h3.appendChild(a)
            container.appendChild(span)
            console.log(list[i])
        }
        console.log(container)
    })
}
createList()


const button = document.querySelector('button')
button.addEventListener('click', function() {
    alert('Thank you for sending us your IP address')
})

const next = document.querySelector('.next')
next.addEventListener('click' , () => {
    $(container).empty()
    pageNum += 1
    console.log(pageNum)
    createList()
})

const previous = document.querySelector('.previous')
previous.addEventListener('click', () => {
    if (pageNum > 1) {
        $(container).empty()
        pageNum -= 1
        createList()
    }
})

