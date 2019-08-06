// 1. create array for chats because the other array is weird
let the_chats = [];
let the_time = [];

const grab_data = ()=>{
	db.collection('chats').get().then((entity)=>{
		// 2. reloads the arrays to 0 so they don't double up.
		the_chats = [];
		the_time = [];
		entity.docs.forEach((item)=>{
			the_chats.push(item.data())
			the_time.push(item.data().time)
		})
		// 3. find largest number(latest time)
		const x = the_time.sort((a,b)=>{return b-a})
		const latest = x[0];

		// 4. find array of the latest time
		const y = the_chats.filter((item)=>{
			if(item.time === x[0]){
				return true
			}
		})
		const paragraph = document.createElement('p');
		paragraph.textContent = `${y[0].username}:  ${y[0].message}`;
		document.getElementById('root').appendChild(paragraph);

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
		grab_data();
	}
	document.getElementById('message').value = '';
})

document.getElementById('message').addEventListener('keydown', (e)=>{
	if(e.keyCode===13){
		if(document.getElementById('message').value.length <1 || document.getElementById('username').value.length <1){
			alert('enter username and message');
		}else{
			add_data();
			grab_data();
		}	
		document.getElementById('message').value = null;
		e.preventDefault();
	}
})