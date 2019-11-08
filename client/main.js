alert('Configure IP:192... y verifique puerto')
const socket = io.connect('http://192.168.201.123:6677', {forceNew:true} )

socket.on('messages', function(data){
	console.log('Data', data)
	render( data )
})

function render( data ){
	let html = data.map( (item, index)=>{
		return (`<div class="message">
			<strong>${item.nick}:</strong>  ${item.text}
			</div>`)
	}).join(' ')

	const div_messages = document.getElementById('messages')
	div_messages.innerHTML = html
	div_messages.scrollTop = div_messages.scrollHeight
}

function addMsg( f ){
	let nick = document.getElementById('nick')
	let msg = document.getElementById('msg')
	let message = {
		nick: nick.value,
		text: msg.value
	}
	nick.style.display = 'none'
	msg.value = ''
	msg.focus()

	socket.emit('add-msg', message)
	return false
}