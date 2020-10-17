const AVATAR_BUCKET = 'zxsvm-zxsvm-avatar_bucket'

class FireStorageHelper {
  static _getBucket(fireadmin) {
    if (FireStorageHelper._avatarBucket) {
      return FireStorageHelper._avatarBucket
    }
    FireStorageHelper._avatarBucket = fireadmin.storage().bucket(AVATAR_BUCKET)

    return FireStorageHelper._avatarBucket
  }

  static async updateAvatar({ fireadmin, filePath, uid }) {
    if (!filePath) {
      throw Error('FireStorageHelper.updateAvatar filePath is required')
    }
    if (!uid) {
      throw Error('FireStorageHelper.updateAvatar uid is required')
    }

    const bucket = FireStorageHelper._getBucket(fireadmin)

    const addResult = await bucket.upload(filePath)
    const storageObj = addResult.find((item) => item?.kind === 'storage#object')

    await FireStorageHelper._fireAuthUpdate({ fireadmin, uid, photoURL: storageObj.mediaLink })

    return storageObj.mediaLink
  }

  // TODO: double-check!
  static async deleteAvatar({ fireadmin, photoURL }) {
    const bucket = FireStorageHelper._getBucket(fireadmin)
    await bucket.file(photoURL).delete()

    await FireStorageHelper._fireAuthUpdate({ fireadmin, uid, photoURL: null })
  }

  static async _fireAuthUpdate({ fireadmin, uid, photoURL }) {
    await fireadmin.auth().updateUser(uid, {
      photoURL,
    })
  }
}

export default FireStorageHelper
