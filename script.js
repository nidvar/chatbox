const div = document.getElementById('root');
const user_input = document.getElementById('user_input');
const form = document.getElementById('form');
const new_user = `${(Math.random()*100).toFixed(0)}`;

let all_id=[];


db.collection('items').onSnapshot((entity)=>{
    console.log(entity.docChanges().forEach((item)=>{
        if(item.type==='added'){
            div.innerHTML+=`<div id='chat_div'>
            <div id='flexdiv'><p>${item.doc.data().user}:</p><p>${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}</p></div>
            <p id='the_text'> ${item.doc.data().title}</p>
            </div>`
            
            var element = document.getElementById('root');
            element.scrollTop = element.scrollHeight - element.clientHeight;
        }
    }));
})

const add=(the_object)=>{
    db.collection('items').add(the_object).then(()=>{console.log('added')}).catch(()=>{console.log('failed to add')})
}

const clear_log=()=>{
    //clear div
    div.innerHTML='';
    //grab items from db
    db.collection('items').get().then((entity)=>{
        //push all the items - ID's - into the array above
        entity.docs.forEach((item)=>{
            all_id.push(item.id);
        })
        //for each ID in the new array, match with database and delete
        all_id.forEach((item)=>{
            db.collection('items').doc(item).delete().then(()=>{all_id=[];console.log('deleted')}).catch(()=>{console.log('failed to delete')})
        })
    }).catch(()=>{console.log('failed to get')})
    div.innerHTML='';
}

const run_it=()=>{
    const x = {
        title:user_input.value,
        time:new Date().getTime(),
        user:`${new_user}-<b>${user_name.value}</b>`
    }
    add(x);
    user_input.value='';
}

user_input.addEventListener('keydown', (e)=>{
    if(e.keyCode===13){
        e.preventDefault();
        run_it();
    }
})

document.getElementById('mybutton').addEventListener('click', ()=>{
    run_it();
})

clear.addEventListener('click', ()=>{
    clear_log();
})