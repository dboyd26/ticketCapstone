let ticket = document.querySelector('create').value;//make ticket

let updateTicket = document.querySelector("edit").value;//update ticket

updateTicket.addEventListener('click', _ => {
    fetch('/ticket', {
        method: 'put'
    })
})