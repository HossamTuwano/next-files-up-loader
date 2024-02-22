import { prisma } from '@/util/db'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export const POST = async (req: NextRequest) => {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) return NextResponse.json({ success: false })

  //converting to buffer object
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes) // you can do any thing with this e.g upload to aws

  // uploading to prisma
  // example writing it to the file system
  const path = join('/', 'tmp', file.name)
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ success: true })
}
