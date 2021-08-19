const initialState = {
    wazas: {
        list: [{name: "aiai", id:"1", level:"2", url:"https://www.youtube.com/embed/cWDJoK8zw58", achieve:"1", makeDay:null, favorite:false },
        {name: "うんち", id:"2", level:"3", url:"https://www.youtube.com/embed/cWDJoK8zw58", achieve:"1", makeDay:null, favorite:false },
        {name: "ステハゲ", id:"3", level:"4", url:"https://www.youtube.com/embed/cWDJoK8zw58", achieve:"1", makeDay:null, favorite:false },
        {name: "スーツ", id:"4", level:"1", url:"https://www.youtube.com/embed/cWDJoK8zw58", achieve:"1", makeDay:null, favorite:false },]
    },
    users: {
        isSignedIn: false,
        uid: "",
        username: ""
    }
};

export default initialState