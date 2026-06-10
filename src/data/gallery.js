/**
 * Gallery media — dynamically loaded from src/gallery/.
 * Rescan: add/remove files in src/gallery/ and the carousel updates on rebuild.
 */

const assetModules = import.meta.glob('../gallery/*.{jpeg,jpg,mov,mp4}', {
  eager: true,
  import: 'default',
});

function filenameFromPath(path) {
  return path.split('/').pop() ?? path;
}

function mediaType(filename) {
  if (/\.(mov|mp4)$/i.test(filename)) return 'video';
  if (/\.(jpe?g)$/i.test(filename)) return 'image';
  return null;
}

function compareFilenames(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export const GALLERY_ITEMS = Object.entries(assetModules)
  .map(([path, src]) => {
    const filename = filenameFromPath(path);
    const type = mediaType(filename);
    if (!type) return null;

    return { id: filename, type, filename, src };
  })
  .filter(Boolean)
  .sort((a, b) => compareFilenames(a.filename, b.filename));

export const GALLERY_FILES = GALLERY_ITEMS.map((item) => item.filename);
