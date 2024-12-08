import { PokemonModel, PokemonResponse } from './../../models/pokemon.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { mergeMap, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../ngrx/pokemon/pokemon.state';
import * as PokemonActions from '../../ngrx/pokemon/pokemon.actions';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private pkm: PokemonService,
    private store: Store<{
      pokemons: PokemonState;
    }>,
    private sanitizer: DomSanitizer
  ) {}
  subscription: Subscription[] = [];
  firstVideoUrl: string | null = null;
  pokemonList$ = this.store.select('pokemons', 'pokemons');
  isGetSuccess$ = this.store.select('pokemons', 'isGetsuccess');
  data: PokemonResponse | null = null;
  firstFourVideos: string[] = [];
  carouselInterval: any;
  isModalOpen = false;
  selectedPokemon: any = null;

  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.isModalOpen = true;
    setTimeout(() => {
      document.querySelector('.modal')?.classList.add('show');
    }, 10);
  }

  closeModal() {
    document.querySelector('.modal')?.classList.remove('show');
    setTimeout(() => {
      this.isModalOpen = false;
      this.selectedPokemon = null;
    }, 300);
  }

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.getList({ page: 1, limit: 10 }));

    this.subscription.push(
      this.isGetSuccess$
        .pipe(
          mergeMap((isGetSuccess) => {
            if (isGetSuccess) {
              return this.pokemonList$;
            }
            return [];
          })
        )
        .subscribe((data) => {
          this.data = data;
          console.log('data', this.data);
        }),
      this.pokemonList$.subscribe((response) => {
        if (response?.data?.pokemons?.length) {
          this.firstFourVideos = response.data.pokemons
            .slice(0, 4) // Chỉ lấy 4 video đầu tiên
            .map((pokemon) => pokemon.ytbUrl);
        }
      })
    );
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.carouselInterval = setInterval(() => {
      // Trigger the next slide (by simulating a click)
      const nextButton = document.querySelector(
        '.carousel-control-next'
      ) as HTMLElement;
      nextButton.click();
    }, 5000); // 5 seconds interval
  }
  getSafeUrl(url: string): SafeResourceUrl {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1].split('&')[0]; // Lấy videoId từ URL
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getFormattedUrl(url: string): string {
    // Thay thế "youtu.be" thành "youtube"
    const formattedUrl = url.replace('youtu.be', 'youtube.com/watch?v=');
    return formattedUrl;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    clearInterval(this.carouselInterval);
  }
}
