const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    bio: {
        type: String,
        max: 250,
        default:''
    },
    avatar: {
        Data: Buffer,
        ContentType: String
    },
    newsletter:{
      type: Boolean,
      default: true
    },
    privateAccount: {
      type: Boolean,
      default: false
    },
    location: {
        country: {
            type: String,
            default:''
        },
        state: {
            type: String,
            default:''
        },
        city: {
            type: String,
            default:''
        }
    },
    links: {
        website: {
            type: String,
            default:''
        },
        twitter: {
            type: String,
            default:''
        },
        facebook: {
            type: String,
            default:''
        },
        youtube: {
            type: String,
            default:''
        },
        instagram: {
            type: String,
            default:''
        }
    },
    myBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        }
    ], default: [],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        }
    ], default: [],
    recentlyViewedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
        }
    ], default: [],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review',
        }
    ], default: []
});


var Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
//module.exports = Profile = mongoose.model('profile', ProfileSchema);