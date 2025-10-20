import { ElementRef, Injectable } from "@angular/core";
import { Media } from "../home/home";

@Injectable({
  providedIn: 'root',
})
export class Util {
  private carousels: ElementRef<HTMLDivElement>[] = [];

  setCarousels(carousels: ElementRef<HTMLDivElement>[]) {
    this.carousels = carousels;
  }

  scrollLeft(sectionIndex: number) {
    const carousel = this.carousels[sectionIndex]?.nativeElement;
    if (carousel) carousel.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(sectionIndex: number) {
    const carousel = this.carousels[sectionIndex]?.nativeElement;
    if (carousel) carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }

  getMovieType(movie: Media): 'movie' | 'tv' {
    if (movie.media_type) return movie.media_type;
    return movie.name && !movie.title ? 'tv' : 'movie';
  }
}
