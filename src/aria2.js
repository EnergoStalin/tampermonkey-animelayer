import {WebSocketTransport, RequestManager, Client} from '@open-rpc/client-js';

export class Aria2 {
  #rpcMapping = {};

  async connect(endpoint, secret) {
    const transport = new WebSocketTransport(endpoint);
    const requestManager = new RequestManager([transport]);
    const auth = `token:${secret}`;

    this.rpc = new Client(requestManager);
    this.rpc.request = new Proxy(this.rpc.request, {
      apply: function(target, thisArg, args) {
        args[0].params ??= [];
        args[0].params.unshift(auth);
        return target.apply(thisArg, args);
      },
    });
    this.rpc.onNotification(async (rpc) => {
      const promises = (this.#rpcMapping[rpc.method] ?? []).map((e) => e.apply(this, rpc.params));
      if (promises && promises[0] instanceof Promise) {
        await Promise.all(promises);
      }
    });

    await this.getGlobalStat();

    return this;
  }

  close() {
    this.rpc.close();
  }

  /**
   * @param {string} event
   * @param {CallableFunction} callback
   */
  on(event, callback) {
    this.#rpcMapping[event] = this.#rpcMapping[event] ? [callback, ...this.#rpcMapping[event]] : [callback];
  }

  /**
   * @param {string} id
   */
  async status(id) {
    return await this.rpc.request({method: 'aria2.tellStatus', params: [id]});
  }

  /**
   * @param {string} b64Torrent
   * @param {boolean} pause
   */
  async addTorrent(b64Torrent, pause = true) {
    return await this.rpc.request({method: 'aria2.addTorrent', params: [b64Torrent, [], {pause: `${pause}`}]});
  }

  /**
   * @param {string} id
   */
  async unpause(id) {
    return await this.rpc.request({method: 'aria2.unpause', params: [id]});
  }

  /**
   * @param {string} id
   * @param {number[] | string[]} ids
   */
  async selectFiles(id, ids) {
    return await this.rpc.request({method: 'aria2.changeOption', params: [id, {
      'select-file': ids.join(','),
    }]});
  }

  async getGlobalStat() {
    return await this.rpc.request({method: 'aria2.getGlobalStat'});
  }
}
