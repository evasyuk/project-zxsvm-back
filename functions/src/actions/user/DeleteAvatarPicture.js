import Exe from '../../helper/router/Exe'

import FireStorageHelper from '../../helper/FireStorageHelper'

// TODO: double-check
class UpdateAvatarPicture extends Exe {
  static contextBuilder = (ctx) => ({
    fireadmin: ctx.fireadmin,
    uid: ctx.state.userRecord.uid,
    photoURL: ctx.state.userRecord.photoURL,
  })

  async execute({ uid, picture }) {
    try {
      await FireStorageHelper.deleteAvatar({ fireadmin: this.context.fireadmin, filePath: picture.path, uid })
    } catch (error) {
      console.log(error)
    }

    return {
      data: {
        msg: 'deleted successfully'
      },
      code: 200,
    }
  }
}

export default UpdateAvatarPicture
