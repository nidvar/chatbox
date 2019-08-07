// 1. create array for chats because the other array is weird
let the_chats = [];

db.collection('chats').onSnapshot((entity)=>{
	console.log(entity.docChanges().forEach((item)=>{
		if(item.type === 'added'){
			grab_data();
		}
	}));
})

const grab_data = ()=>{
	db.collection('chats').get().then((entity)=>{
		// 2. reloads the arrays to 0 so they don't double up.
		the_chats = [];
		entity.docs.forEach((item)=>{
			the_chats.push(item.data())
		})

		the_chats.sort((a, b) => (a.time > b.time) ? 1 : -1)

		document.getElementById('root').innerHTML = '';

		the_chats.forEach((item)=>{
			const paragraph = document.createElement('p');
			paragraph.textContent = `${item.username}:  ${item.message}`;
			document.getElementById('root').appendChild(paragraph);			
		})



	}).catch((error)=>{
		console.log(error)
	})
}

const add_data = ()=>{
	let the_message={
		message:document.getElementById('message').value,
		username:document.getElementById('username').value,
		time:Date.now()
	}
	db.collection(`chats`).add(the_message).then(()=>{
		console.log('added')
	})
}

document.getElementById('send').addEventListener('click', ()=>{
	if(document.getElementById('message').value.length <1 || document.getElementById('username').value.length <1){
		alert('enter username and message');
	}else{
		add_data();
	}
	document.getElementById('message').value = '';
})

document.getElementById('message').addEventListener('keydown', (e)=>{
	if(e.keyCode===13){
		if(document.getElementById('message').value.length <1 || document.getElementById('username').value.length <1){
			alert('enter username and message');
		}else{
			add_data();
		}	
		document.getElementById('message').value = null;
		e.preventDefault();
	}
})
