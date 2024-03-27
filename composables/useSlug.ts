export default function useSlug() {
  const slugConverter = (text: string): string => {
    const textNoSpace = text.toLowerCase().replace(/\s/g, "-")
    const slug = textNoSpace.replace(/[^a-z0-9-]+/g, "-")
    return slug
  }

  return {
    slugConverter
  }
}