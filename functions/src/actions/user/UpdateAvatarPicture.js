import Exe from '../../helper/router/Exe'

import FireStorageHelper from '../../helper/FireStorageHelper'

import { validateUploadFile, unlink } from '../../helper/validateUploadFile'

class UpdateAvatarPicture extends Exe {
  static get validationRules() {
    return {
      picture: 'required',
    }
  }

  static paramsBuilder = (ctx) => ({
    picture: ctx?.body?.files?.picture,
  })

  static contextBuilder = (ctx) => ({
    fireadmin: ctx.fireadmin,
    userRecord: ctx.state.userRecord,
    uid: ctx.state.user.uid,
  })

  async execute({ picture }) {
    validateUploadFile(picture)

    try {
      this.context.userRecord.photoURL = await FireStorageHelper.updateAvatar({
        fireadmin: this.context.fireadmin,
        filePath: picture.path,
        uid: this.context.uid,
      })
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      unlink(picture)
    }

    return {
      data: {
        userRecord: this.context.userRecord,
      },
      code: 201,
    }
  }
}

export default UpdateAvatarPicture
