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
    userRecord: ctx.state.userRecord.uid,
  })

  async execute({ userRecord, picture }) {
    validateUploadFile(picture)

    try {
      userRecord.photoURL = await FireStorageHelper.updateAvatar({
        fireadmin: this.context.fireadmin,
        filePath: picture.path,
        uid: userRecord.uid
      })
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      unlink(picture)
    }

    return {
      data: {
        userRecord,
      },
      code: 201,
    }
  }
}

export default UpdateAvatarPicture
