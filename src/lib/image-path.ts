/**
 * Utility function to get the correct image path based on the base path environment variable
 * @param imagePath - The path to the image (should start with /)
 * @returns The full path including base path if set
 */
export function getImagePath(imagePath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  
  // Ensure imagePath starts with /
  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath;
  }
  
  return basePath + imagePath;
}
