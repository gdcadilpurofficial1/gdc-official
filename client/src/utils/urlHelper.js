/**
 * Universal URL Helper for GDC Adilpur
 * Transforms Google Drive, Facebook, Cloudinary, and external links into direct embeddable/viewable URLs.
 */

export const formatImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If already relative asset or empty
  if (trimmed.startsWith('/') || trimmed.startsWith('data:image')) return trimmed;

  // Google Drive URL conversion to Google CDN image link
  if (trimmed.includes('drive.google.com')) {
    let fileId = null;

    // Pattern 1: /file/d/FILE_ID/view or /file/d/FILE_ID
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    }

    // Pattern 2: ?id=FILE_ID or &id=FILE_ID
    if (!fileId) {
      const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }

    if (fileId) {
      // lh3.googleusercontent.com/d/FILE_ID provides high quality direct image embedding
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Return cleaned original URL if normal web link (Cloudinary, FB CDN, Unsplash, Google Photos, etc.)
  return trimmed;
};

export const formatDownloadUrl = (url) => {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();

  if (trimmed.startsWith('/')) return trimmed;

  // Google Drive File View/Download conversion
  if (trimmed.includes('drive.google.com')) {
    let fileId = null;
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    } else {
      const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }

    if (fileId) {
      // Direct view/download URL for Google Drive files
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }

  return trimmed;
};
