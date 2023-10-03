const ApiError = require("../api-error");
const MongoDB = require("../app/utils/mongodb.util");
const contactService = require("../services/contact.service");
const contactService = require("../services/contact.service");
// Create and Save a new Contact
exports.create = async (req, res, next) =>{
    if (!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred white creating th contact")
        );
    }
};
exports.findALL = async (req, res, next) =>{
    let document = [];
    try {
        const contactService = new contactService(MongoDB.client);

        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) =>{
    let document = [];
    try {
        const contactService = new contactService(MongoDB.client);
        const documents = await contactService.findById(req.params.id);
        if (!document){
            return next(new ApiError(400, "Contact not found"));
        }    
    return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
}
// handker upadte
exports.update = async (req, res, next) =>{
    if (Object.keys(req.body).length ==0) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document){
            return next(new ApiError(400, "Contact not found"));
        }  
    } catch(error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};
// handler delete
exports.delete = async (req, res, next) =>{
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document){
            return next(new ApiError(400, "Contact not found"));
        }  
        return res.send({ message: "Contact was deleted successfully" });
    } catch(error) {
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        );
    }
};
//Cài đặt handler findAllFavorite:
exports.findALLFavorite = async (_req, res, next) =>{
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(documents);
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred white favorite contacts")
        );
    }
};
//Cài đặt handler deleteAll:
exports.deleteALL = async (_req, res, next) =>{
    try{
        const contactService = new contactService(MongoDB.client);
        const deleteCount = await contactService.deleteALL();
        return res.send({ message: `${deleteCount} Contact was deleted successfully` });
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred white removing all contacts")
        );
    }
};
exports.create = (req, res) => {
    res.send({ message: "create handler"});
};
exports.findALL = (req, res) => {
    res.send({ message: "findALL handler"});
};
exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};
exports.update = (req, res) => {
    res.send({ message: "update handler"});
};
exports.delete = (req, res) => {
    res.send({ message: "delete handler"})
}
exports.deleteALL = (req, res) => {
    res.send({ message: "deleteALL handler"})
};
exports.findALLFavorite = (req, res) => {
    res.send({ message: "fineALLFavorite handler"});
};