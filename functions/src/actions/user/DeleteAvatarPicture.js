import Exe from '../../helper/router/Exe'

import FireStorageHelper from '../../helper/FireStorageHelper'

class DeleteAvatarPicture extends Exe {
  static contextBuilder = (ctx) => ({
    fireadmin: ctx.fireadmin,
    uid: ctx.state.user.uid,
    photoURL: ctx.state.userRecord.photoURL,
  })

  async execute() {
    const { fireadmin, uid, photoURL } = this.context

    try {
      await FireStorageHelper.deleteAvatar({ fireadmin, photoURL, uid })
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

export default DeleteAvatarPicture
