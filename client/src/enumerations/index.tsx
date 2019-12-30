/*
 * ENUMERATIONS
 * Enums allow us to organize a collection of related values. Think of them as
 * a class for values, wherein the value can only be a string , or number.
 *
 */

export enum ROUTES {
  home = '/',
  dashboard = '/dashboard',
  page403 = '/403',
  page404 = '/404',
  page500 = '/500',
}

export enum LOCAL_STORAGE_TEMPLATE {
  token = 'x-token',
}
