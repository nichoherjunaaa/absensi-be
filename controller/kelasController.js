
const getAllKelas = async(req,res) => {
    res.send('getAllKelas')
}

const updateKelas = async(req,res) => {
    res.send('updateKelas')
}

const deleteKelas = async(req,res) => {
    res.send('deleteKelas')
}

const createKelas = async(req,res) => {
    res.send('createKelas')
}

const getKelasByUser = async(req,res) => {
    res.send('getKelasByUser')
}

module.exports = {getAllKelas, updateKelas, deleteKelas, createKelas, getKelasByUser}