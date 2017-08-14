'use babel';

import AtomForPackageView from './atom-for-package-view';
import { CompositeDisposable } from 'atom';

export default {

  atomForPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomForPackageView = new AtomForPackageView(state.atomForPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomForPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-for-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomForPackageView.destroy();
  },

  serialize() {
    return {
      atomForPackageViewState: this.atomForPackageView.serialize()
    };
  },

  toggle() {
    console.log('AtomForPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
