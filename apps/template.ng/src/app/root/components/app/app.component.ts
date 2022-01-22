import { Component, OnInit } from '@angular/core';

import {
  faCodeBranch,
  faCookie,
  faCookieBite,
  faMoon,
  faServer,
  faSun,
  faTimesCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { Theme } from '../../enums/theme.enum';
import { ConfigService } from '../../../shared/services/config/config.service';
import { SafeCookieService } from '../../../shared/services/safe-cookie/safe-cookie.service';

@Component({
  selector: 'template-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // font awesome icons!
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  faCookie: IconDefinition = faCookie;
  faCookieBite: IconDefinition = faCookieBite;
  faTimesCircle: IconDefinition = faTimesCircle;
  faGitHub: IconDefinition = faGithub;
  faServer: IconDefinition = faServer;
  faCodeBranch: IconDefinition = faCodeBranch;

  // theme
  currentTheme: string = Theme.LIGHT;

  // information flag for bottom right of screen
  showEnvironmentInformation = false;
  get hideEnvironmentInformation(): boolean {
    return !this.showEnvironmentInformation;
  }

  constructor(
    private configService: ConfigService,
    private cookieService: SafeCookieService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('theme')) {
      this.currentTheme = this.cookieService.get('theme') as Theme;
    } else {
      this.cookieService.set('theme', this.currentTheme);
    }
  }

  // environment information
  toggleEnvironmentInformation(): void {
    this.showEnvironmentInformation = !this.showEnvironmentInformation;
  }

  // config gets
  getEnvironmentName(): string {
    return this.configService?.configuration?.environment ?? 'un_ERROR__known';
  }

  getVersion(): string {
    return this.configService?.configuration?.version ?? '-_0__\\';
  }

  // cookie logic
  getCookieIcon(): IconDefinition {
    return this.cookieService.isAllowedToHaveCookies()
      ? faCookieBite
      : faTimesCircle;
  }

  toggleCookies(): void {
    if (this.cookieService.isAllowedToHaveCookies()) {
      this.cookieService.DISABLE_COOKIES();
    } else {
      this.cookieService.ENABLE_COOKIES();
    }
  }

  // theme logic
  getThemeIcon(): IconDefinition {
    // opposite of current theme
    return this.currentTheme === Theme.LIGHT ? this.faMoon : this.faSun;
  }

  toggleTheme(): void {
    this.currentTheme =
      this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.cookieService.set('theme', this.currentTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === Theme.DARK;
  }

  isLightTheme(): boolean {
    return this.currentTheme === Theme.LIGHT;
  }
}
