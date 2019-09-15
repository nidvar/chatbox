const div = document.getElementById('root');
const user_input = document.getElementById('user_input');
const form = document.getElementById('form');
const colors=['blue', 'red', 'orange', 'green', 'black'];
const mycss= `color:${colors[Math.floor(Math.random()*4)]}`;
const mybackcss=`background-color:beige`;
const new_user = `ID:${(Math.random()*100).toFixed(1)}`;

let thechats=[];

let listofids=[];


const run=()=>{
    const x = {
        title:user_input.value,
        time:new Date().getTime(),
        user:`${document.getElementById('user_name').value} - ${new_user}`
    }
    //add to db
    db.collection('items').add(x).then(()=>{console.log('added')}).catch(()=>{console.log('failed to add')})

    //grab from db
    db.collection('items').get().then((entity)=>{
        div.innerHTML='';
        thechats=[];
        entity.docs.forEach((item)=>{
            thechats.push(item.data())
            listofids.push(item.id)
        })
        thechats.sort((a, b) => (a.time > b.time) ? 1 : -1);

        thechats.forEach((item)=>{
            div.innerHTML+=`
            <div class='box' style='${mybackcss}'>
                <div class='myflexbox'>
                    <p><b>${item.user}:</b></p> 
                    <p>${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}</p> 
                </div>
                
                <p style='${mycss}'>${item.title}</p>
            </div>`
        })

        var element = document.getElementById('root');
        element.scrollTop = element.scrollHeight - element.clientHeight;

    }).catch(()=>{console.log('failed to grab data')});
    user_input.value='';
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    run();
})

user_input.addEventListener('keydown',(e)=>{
    if(e.keyCode===13){
        e.preventDefault();
        run();
        user_input.value='';
    }
    
})

document.getElementById('clear').addEventListener('click',()=>{
    listofids.forEach((item)=>{
        db.collection('items').doc(item).delete()
    })
    div.innerHTML='';
})

