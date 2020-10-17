import fs from 'fs'

const FILE_TYPES_JPEG_JPG_PNG = ['image/jpeg', 'image/png', 'image/jpg', 'jpeg', 'png', 'jpg']
const MAX_SIZE_2 = 2 * 1024 * 1024

export const unlink = (file) => fs.unlinkSync(file.path)

export const validateUploadFile = (file) => {
  const mUnlink = () => unlink(file)

  if (!file.size) {
    mUnlink()
    throw new Error('MEDIA.FILE_IS_EMPTY')
  }

  if (!FILE_TYPES_JPEG_JPG_PNG.includes(file.type)) {
    mUnlink()
    throw new Error('MEDIA.SUPPORTED_JPEG_JPG_PNG')
  }

  if (file.size > MAX_SIZE_2) {
    mUnlink()
    throw new Error('MEDIA.FILE_SIZE_2MB_EXCEEDED')
  }
}