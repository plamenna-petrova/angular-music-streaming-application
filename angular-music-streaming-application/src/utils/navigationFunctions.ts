import { Router } from "@angular/router";

export const navigateToComponent = (router: Router, url: string) : void => {
  router.navigate([`/${url}`]);
}