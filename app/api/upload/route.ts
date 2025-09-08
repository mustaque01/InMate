import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'profile', 'document', 'room'
    const entityId = formData.get('entityId') as string

    if (!file) {
      return createErrorResponse('No file uploaded')
    }

    if (!type || !['profile', 'document', 'room'].includes(type)) {
      return createErrorResponse('Invalid file type')
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return createErrorResponse('File size too large. Maximum 5MB allowed.')
    }

    // Validate file type
    const allowedTypes = {
      profile: ['image/jpeg', 'image/png', 'image/webp'],
      document: ['application/pdf', 'image/jpeg', 'image/png'],
      room: ['image/jpeg', 'image/png', 'image/webp']
    }

    if (!allowedTypes[type as keyof typeof allowedTypes].includes(file.type)) {
      return createErrorResponse(`Invalid file type for ${type}`)
    }

    // Create upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${entityId || user.id}_${timestamp}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Generate public URL
    const fileUrl = `/uploads/${type}/${fileName}`

    // TODO: Update database schema to include profilePhoto and photos fields
    // For now, just return the file URL
    const updateResult = {
      message: 'File uploaded successfully. Database schema needs to be updated to store file references.'
    }

    return createSuccessResponse({
      fileName,
      fileUrl,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      updateResult
    })
  } catch (error) {
    console.error('File upload error:', error)
    return createErrorResponse('File upload failed', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const { searchParams } = new URL(request.url)
    const fileUrl = searchParams.get('fileUrl')

    if (!fileUrl) {
      return createErrorResponse('File URL is required')
    }

    // Security check - only allow deleting files from uploads folder
    if (!fileUrl.startsWith('/uploads/')) {
      return createErrorResponse('Invalid file URL')
    }

    // Remove from filesystem
    const filePath = join(process.cwd(), 'public', fileUrl)
    try {
      await require('fs/promises').unlink(filePath)
    } catch (fsError) {
      console.log('File not found on filesystem:', fileUrl)
    }

    // Remove from database (if needed in future when schema is updated)
    // Currently no profilePhoto field in User schema

    return createSuccessResponse({ 
      message: 'File deleted successfully',
      deletedFile: fileUrl 
    })
  } catch (error) {
    console.error('File deletion error:', error)
    return createErrorResponse('File deletion failed', 500)
  }
}
