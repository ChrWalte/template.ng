import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SafeCookieService {
  private allowCookies = true;

  constructor(private cookieService: CookieService) {}

  // disable cookies and delete all cookies
  DISABLE_COOKIES(): void {
    this.deleteAll();
    this.allowCookies = false;
    this.warnNOW();
  }

  // enable cookies
  ENABLE_COOKIES(): void {
    this.allowCookies = true;
    this.warnNOW();
  }

  // check if cookies are allowed
  isAllowedToHaveCookies(): boolean {
    return this.allowCookies;
  }

  // check if cookie exists
  check(key: string): boolean {
    return this.cookieService.check(key);
  }

  // get cookie value by key
  // with cookie allow check
  get(key: string): string | undefined {
    if (this.allowCookies) {
      return this.cookieService.get(key);
    } else {
      this.warn();
      return undefined;
    }
  }

  // get all cookies with key and value
  // with cookie allow check
  getAll(): { [key: string]: string } | undefined {
    return this.allowCookies ? this.cookieService.getAll() : undefined;
  }

  // set a cookie using a key value pair
  set(
    key: string,
    value: string,
    options?: {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'None' | 'Strict';
    }
  ): void {
    if (this.allowCookies) {
      this.cookieService.set(key, value, options);
    } else {
      this.warn();
    }
  }

  // deletes a cookie by key
  delete(
    name: string,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict'
  ): void {
    if (this.allowCookies) {
      this.cookieService.delete(name, path, domain, secure, sameSite);
    } else {
      this.warn();
    }
  }

  // deletes all cookies
  deleteAll(
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict'
  ): void {
    if (this.allowCookies) {
      this.cookieService.deleteAll(path, domain, secure, sameSite);
    } else {
      this.warn();
    }
  }

  private warn() {
    console.warn(`[SafeCookieService.allowCookies is ${this.allowCookies}]`);
  }

  private warnNOW() {
    console.warn(
      `[SafeCookieService.allowCookies is NOW ${this.allowCookies}]`
    );
  }
}
