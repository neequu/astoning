import { Button } from './ui/button'
import { HiddenTextBlock } from './HiddenTextBlock'
import type { Anime } from '@/types/anime'

interface Props {
  item: Anime
}

export function AnimeCard({ item }: Props) {
  return (
    <section className="grid md:grid-cols-2 gap-10">
      <div className="flex flex-col items-center gap-5">
        <div className="h-[500px] rounded-md overflow-hidden">
          <img className="block w-full h-full max-h-[500px]" src={item.images.webp.large_image_url} alt={item.title} />
        </div>
        <div className="border-2 border-muted-foreground rounded-full h-20 aspect-square grid place-content-center">
          <p className="text-3xl font-bold text-muted-foreground">{item.score ?? 'N/D'}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <Button asChild variant="link" className="font-bold mb-1 text-2xl p-0">
            <a href={item.url} target="_blank" rel="noreferrer"><h1>{item.title}</h1></a>
          </Button>
          <p className="text-muted-foreground">{item.title_japanese}</p>
        </div>

        <HiddenTextBlock text={item.synopsis} className="mb-4" />

        <div>
          <p className="text-muted-foreground font-semibold text-xl mb-2">Info</p>
        </div>
        <p>
          <span className="text-muted-foreground font-semibold">Rating:</span>
          &nbsp;
          {item.rating }
        </p>
        <p>
          <span className="text-muted-foreground font-semibold">Release year:</span>
          &nbsp;
          {item.year ?? 'N/D'}
        </p>

        <p>
          <span className="text-muted-foreground font-semibold">Type:</span>
          &nbsp;
          {item.type}
        </p>
        <p>
          <span className="text-muted-foreground font-semibold">Episodes:</span>
          &nbsp;
          {item.episodes}
        </p>
        <div className="flex-1 flex place-items-end mt-6 ">
          <Button className="w-full font-bold">
            Add to favorites
          </Button>
        </div>
      </div>
    </section>
  )
}
