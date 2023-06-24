import { action, observable } from 'mobx';
import { Profile } from '../utils/api';

export default class DownloadStore {
  @observable isLoading = false;

  @action
  /* get export link */ getExportLink(buyid, type) {
    this.isLoading = true;
    const param = {
      buyid,
      type,
    };

    Profile.export(param).then((json) => {
      this.isLoading = false;

      if (json.success === true && !json.data.message) {
        location.href = json.data;
      }
    });
  }
}
