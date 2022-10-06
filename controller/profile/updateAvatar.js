const { updateAvatar} = require('../../services/profile/updateAvatar')

exports.updateAvatar = async (req, res) => {
    if(!req.files || !req.files.image){
        return res.status(422).json({
            message: 'No image provided!'
        })
    }
    const mimetype = req.files.image.mimetype
    const filetypes = ['image/jpeg','image/jpg','image/png','image/gif']
    if (!filetypes.includes(mimetype)) {
        return res.status(422).json({
            message: 'Images Only! Only files with jpeg, jpg, png and gif extension accepted'
        })
    };
    updateAvatar(req, res)
}