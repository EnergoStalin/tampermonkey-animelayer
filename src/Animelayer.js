import {Aria2} from './aria2.js';

export class Animelayer {
  /**
   * @param {import('./GMStore').GMStore} gmstore
   */
  constructor(gmstore) {
    this.gmstore = gmstore;
  }

  async connect(endpoint, secret) {
    this.rpc = await new Aria2().connect(endpoint ?? this.gmstore.endpoint, secret ?? this.gmstore.secret);
  }

  /**
  * @param {string} b64
  * @returns
  */
  async downloadLastEpisode(b64) {
    const id = await this.rpc.addTorrent(b64);
    const status = await this.rpc.status(id);

    const fontOut = status.files.filter((e) => !e.path.includes('font'));

    const files = fontOut.map((e) => e.path).sort().splice(-2, 2);
    const ids = status.files.filter((e) => files.includes(e.path)).map((e) => e.index);

    await this.rpc.selectFiles(id, ids);
    await this.rpc.unpause(id);

    return files;
  }
}
