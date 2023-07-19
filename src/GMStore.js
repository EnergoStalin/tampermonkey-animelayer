/* eslint-disable new-cap */
export class GMStore {
  get endpoint() {
    return GM_getValue('endpoint', '');
  }
  set endpoint(value) {
    GM_setValue('endpoint', value);
  }

  get secret() {
    return GM_getValue('secret', '');
  }
  set secret(value) {
    GM_setValue('secret', value);
  }
}
