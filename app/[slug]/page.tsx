import ContentPageClient from "./ContentPageClient"

// Mock content - now back to being hardcoded here
const mockContent: Record<string, { title: string; content: string }> = {
  brands: {
    title: "Recognized Concerns",
    content: `
# Recognized Concerns

Asenturisk Corporation proudly encompasses a diverse portfolio of brands, each of which is a beacon of innovation in its respective domain.

- MuxDay
- MuxAI
- Time Co.
- Amrella
- Codbel Carigors
- THRXT Technologies
- Kodbell-Amrella Media
- VewDew Hundred Corp
- Sawpman Enterprise
- Ulikoo
- Webnova Publishing
- MuktoDMI Studios
- Mux App Division
- Mux Games
- Bongojukti
- Mux Anime Studios
- ICEferno
- Exalux

As time goes on, our list continues to grow evermore stronger and longer. Many a time, we might forget to update or include a few of our subsidiaries. In case we do, please free to request removal of errata.
    `,
  },
  contact: {
    title: "Transmission Hub",
    content: `
# Transmission Hub

Ready to connect with the Asenturisk Corporation? Our communication channels span across multiple dimensions of digital space.

## Physical Location

Our network spans multiple nations, communities and continents for which we are located wherever our members and employees are standing. Thus, we refuse to disclose any locations as being our official headquarters.

## Online Presence

- **YouTube**: /@Asenturisk
- **Facebook**: /asenturisk
- **Instagram**: /asenturisk
- **GitHub**: /asenturisk

Besides these aforementioned platforms, our team may use other profiles in order to interact with customers, investors and critics alike.
    `,
  },
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  return <ContentPageClient params={params} />
}

export function generateStaticParams() {
  return Object.keys(mockContent).map((slug) => ({
    slug,
  }))
}
