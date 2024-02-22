'use client'
import React, { FormEvent, useState } from 'react'
import { POST } from './api/upload/route'

export default function Home() {
  const [image, setImage] = useState<File>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) setImage(files[0])
  }

  console.log(image)

  const uploadImage = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('file', image as any)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) throw new Error(await res.text())
      // return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main>
      <form action='' onSubmit={uploadImage}>
        <input name='file' type='file' onChange={handleChange} />
        <button type='submit'>upload</button>
      </form>
      <div className='border-1 h-40 w-40'></div>
    </main>
  )
}
