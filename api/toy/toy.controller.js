const toyService = require('./toy.service');

async function getToys(req, res) {
    try {
        let filterBy = req.query;
        if (!Object.keys(filterBy).length) filterBy = { name: '', inStock: 'all', types: [], sortBy: 'name', pageDiff: 0 };
        const toys = await toyService.query(filterBy);
        res.send(toys);
    } catch (err) {
        res.status(500).send({ err: 'Failed to get toys' });
    }
}

async function getToyById(req, res) {
    try {
        const {toyId} = req.params;
        const toy = await toyService.getById(toyId);
        res.send(toy);
    } catch (err) {
        res.status(401).send({ err: "Toy doesn't exist" });
    }
}

async function addToy(req, res) {
    try {
        const toy = req.body; //TODO: make sure frontend doesnt add _id
        const savedToy = await toyService.save(toy);
        res.send(savedToy);
    } catch (err) {
        res.status(401).send({ err: "Can't save toy" });
    }
}

async function updateToy(req, res) {
    // console.log('body',req.body);
    // console.log('query',req.query);
    try {
        const toy = req.body;
        const savedToy = await toyService.save(toy);
        res.send(savedToy);

    } catch (err) {
        res.status(401).send({err:'Toy doesn\'t exist'})
    }
}

async function removeToy(req,res){
    try{
    const toyId = req.params.toyId
    await toyService.remove(toyId)
    res.send('Deleted...')

    }catch(err){
            res.status(401).send({err:'Cannot remove toy'})
        }
}

async function addReview(req,res){
    console.log('adding');
    try{
        const {toyId}= req.params
        const {review} = req.body
        console.log('req.body:', req.body)
        await toyService.addReview(toyId, review)
    }catch(err){
        res.status(401).send({err:'Cannot save review'})
    }
}
module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy,
    addReview
};
