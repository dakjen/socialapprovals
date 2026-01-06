import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises'; // Use fs.promises for async operations

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Error ensuring upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

export const parseForm = async (req: Request) => {
  await ensureUploadDir();

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filename: (name, ext, part) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalExtension = part.mimetype?.split('/')[1] || 'png'; // Fallback to png
      return `${name || 'file'}-${uniqueSuffix}.${originalExtension}`;
    },
  });

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => { // req needs to be cast to any for formidable
      if (err) {
        console.error('Error parsing form:', err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

// No need for Next.js API route config to disable body parsing here

