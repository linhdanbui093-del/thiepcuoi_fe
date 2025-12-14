// SEO Metadata helper functions
// Bạn có thể tùy chỉnh các hàm này để tạo metadata SEO

export function generateWeddingMetadata(wedding: any) {
  const title = wedding.metaTitle || `${wedding.groomName} & ${wedding.brideName} - Thiệp Cưới Online`
  const description = wedding.metaDescription || 
    `Thiệp cưới online của ${wedding.groomFullName || wedding.groomName} và ${wedding.brideFullName || wedding.brideName}. Ngày cưới: ${new Date(wedding.weddingDate).toLocaleDateString('vi-VN')}.`
  const keywords = wedding.metaKeywords || `thiệp cưới, ${wedding.groomName}, ${wedding.brideName}, đám cưới, wedding invitation`

  return {
    title,
    description,
    keywords,
    ogImage: wedding.ogImage || undefined,
  }
}

// Bạn có thể tùy chỉnh format metadata ở đây
export function formatWeddingTitle(groomName: string, brideName: string): string {
  return `${groomName} & ${brideName} - Thiệp Cưới Online`
}

export function formatWeddingDescription(
  groomFullName: string,
  brideFullName: string,
  weddingDate: string
): string {
  return `Thiệp cưới online của ${groomFullName} và ${brideFullName}. Ngày cưới: ${new Date(weddingDate).toLocaleDateString('vi-VN')}.`
}

