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

  static _getPictureName(photoURL) {
    if (!photoURL) {
      throw Error('FireStorageHelper._getPictureName photoURL is required')
    }
    try {
      // const photoURL = 'https://storage.googleapis.com/download/storage/v1/b/zxsvm-zxsvm-avatar_bucket/o/FB_IMG_1569088612618.jpg?generation=1603315294685134&alt=media'

      const query = photoURL.split('?')
      const parts = query[0].split('/')
      return parts[parts.length-1]
    } catch (error) {
      throw Error('failed to get picture name')
    }
  }

  static async deleteAvatar({ fireadmin, uid, photoURL }) {
    const bucket = FireStorageHelper._getBucket(fireadmin)
    await bucket.file(FireStorageHelper._getPictureName(photoURL)).delete()

    await FireStorageHelper._fireAuthUpdate({ fireadmin, uid, photoURL: null })
  }

  static async _fireAuthUpdate({ fireadmin, uid, photoURL }) {
    await fireadmin.auth().updateUser(uid, {
      photoURL,
    })
  }
}

export default FireStorageHelper
