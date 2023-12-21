import mongoose from "mongoose";

const URL = `mongodb+srv://bjs397:rmRRXVGUU2uxWNgj@ffdt-cluster.yzvshdi.mongodb.net/?retryWrites=true&w=majority`;

class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(URL)
            .then(()=>console.log("database connection established"))
            .catch(err=>console.log("error occured", err))
    }
}

export default new Database();
