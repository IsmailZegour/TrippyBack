const mkdirp = require('mkdirp');

const createStore = {
  createTravelStore: () => {
    mkdirp(__root+process.env.TRAVELS_PIC_STORE).then(made => {
      if(made) {
        console.log('Created folder architecture : '+made);
      }
    })
  },
  createPhotoStore: () => {
    mkdirp(__root+process.env.PHOTO_STORE).then(made => {
      if (made) {
        console.log('Created folder architecture : '+made);
      }
    });
  },
  createAssetsPicturesStorage: () => {
    mkdirp(__root+process.env.PICTURES_STORE).then(made => {
      if (made) {
        return made;
      }
    });
  },
  createProfilePictureStore: (id) => {
    mkdirp(__root+'/assets/pictures/profile/'+id+'/pp').then(made => {
      if (made) {
        return made;
      }
    })
  },
  cerateProfileBannerStore: (id) => {
    mkdirp(__root/'/assets/pictures/profile'+id+'/banner').then(made => {
      if (made) {
        return made;
      }
    })
  }
}

module.exports = createStore;