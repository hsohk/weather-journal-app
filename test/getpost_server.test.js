it('POST to Server',()=>{
    url = 'http://localhost/add';
    const data = {temp : 23, date:'09.24.2020',res:'WOW!!!'};
    let newData;
    const postTest = async (url , data )=>{
        console.log(data);
        const res = await fetch(
            url,
            {method: 'POST',
                credentials: 'same-origin',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify(data)}
        );
        try{
            newData = await res.json();
            console.log("Posted data : "+ newData);
            return newData;
        } catch(e){
            console.log("error", e);
        }
        data.temp = 22;
        expect(newData.temp).toBe(data.temp);
    }
})