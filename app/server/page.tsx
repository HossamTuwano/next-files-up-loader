import { writeFile } from 'fs/promises'
import { join } from 'path'
import React from 'react'

function ServerUploadPage() {
  const uploadImage = async (data: FormData) => {
    'use server'
    const file: File | null = data.get('file') as unknown as File

    if (!file) throw new Error('No file uploaded')

    //converting to buffer object
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes) // you can do any thing with this e.g upload it to aws

    // example writing it to the file system
    const path = join('/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return { success: true }
  }
  return (
    <div>
      {' '}
      <main>
        <form action={uploadImage}>
          <input name='file' type='file' />
          <button type='submit'>upload</button>
        </form>
        <div className='border-1 h-40 w-40'></div>
      </main>
    </div>
  )
}

export default ServerUploadPage
