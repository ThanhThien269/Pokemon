import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './ngrx/auth/auth.reducer';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './shared/auth-interceptor';
import { pokemonReducer } from './ngrx/pokemon/pokemon.reducer';
import { PokemonEffects } from './ngrx/pokemon/pokemon.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideStore({}),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'pokemons', reducer: pokemonReducer }),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideStore(),
    provideEffects([PokemonEffects]),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
