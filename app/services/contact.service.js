const { ObjectId } = require("mongodb");

class contactService {
    constructor(client){
        this.Contact = client.db().collection("contacts");
    }
    extractConactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undeined fields
        Objects.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    //
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    // dinh nghia contactService.fine vaf contactService.findByName
    async find(filter){
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
    // dinh nghia contactService.findById(id)
    async findById(id) {
        return await this.Contact.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    // dinh nghia contactService.update(id, document)
    async update(id, payload) {
        const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = contactService;