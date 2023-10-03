const { MongoClinet } = require("mongodb");

class MongoDB {
    static connect = async (uri) =>{
        if(this.client) return this.client;
        this.client = await MongoClinet.connect(uri);
        return this.client;
    };
}