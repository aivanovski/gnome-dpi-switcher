/*jshint esversion: 6 */

const St = imports.gi.St;
const Lang = imports.lang;
const Clutter = imports.gi.Clutter;
const SwitcherPopup  = imports.ui.switcherPopup;
const ExtensionUtils = imports.misc.extensionUtils;
const CurrentExtension = ExtensionUtils.getCurrentExtension();
const Convenience = CurrentExtension.imports.convenience;
const Extension = CurrentExtension.imports.extension;

const DpiPopupPresenter = new Lang.Class({
    Name: 'DpiPopupPresenter',

    _init: function(dpiHandler) {
        this._dpiHandler = dpiHandler;
    },

    _show: function(backward, binding, mask, mode) {
        if ( !this._popup) {
            let items = [];

            items.push(new SwitcherItem(0, 'Turn on', 'ic-hdr-off-w', Extension.DpiMode.HIGH));
            items.push(new SwitcherItem(1, 'Turn off', 'ic-hdr-on-w', Extension.DpiMode.LOW));

            this._popup = new DpiSwitcherPopup(items, this._dpiHandler);
        }

        this._popup.show(backward, binding, mask);

        if (mode == Extension.DpiMode.LOW) {
            this._popup._select(1);
        } else if (mode == Extension.DpiMode.HIGH) {
            this._popup._select(0);
        }

        this._popup.actor.connect('destroy', Lang.bind(this, function() {
                                                this._popup = null;
                                            }));      
    }
});

const DpiSwitcherPopup = new Lang.Class({
    Name: 'DpiSwitcherPopup',
    Extends: SwitcherPopup.SwitcherPopup,

    _init: function(items, dpiHandler) {
        this.parent(items);
        this._switcherList = new DpiSwitcherList(this._items);
        this._dpiHandler = dpiHandler;
    },

    _keyPressHandler: function(keysym, action) {
        if ( (keysym == Clutter.Left ||
                keysym == Clutter.ISO_Left_Tab) && this._selectedIndex > 0 ) {
            this._select(this._previous());
        } else if ( (keysym == Clutter.Right || 
                    keysym == Clutter.Tab) && this._selectedIndex < 3 ) {
            this._select(this._next());
        } else {
            return Clutter.EVENT_PROPAGATE;
        }

        return Clutter.EVENT_STOP;
    },

    _keyReleaseEvent: function(actor, event) {
        let [x, y, mods] = global.get_pointer(),
            state        = mods & this._modifierMask,
            event_key    = event.get_key_symbol();

        // Verifies if it is Extended Mode and Up or Down Keys where pressed
        let pre_index = this._selectedIndex;
        if ( this._selectedIndex == 2 ) {
            if (event_key == Clutter.Up) {
                this._selectedIndex += 2;
            } else  if (event_key == Clutter.Down) {
                    this._selectedIndex += 3;
            }
        }

        if ((event_key == Clutter.Return && state === 0) ||
                (pre_index == 2 && (event_key == Clutter.Up || event_key == Clutter.Down))) {
            this._finish(event.get_time());
        }
        
        return Clutter.EVENT_STOP;
    },

    _finish : function(time)  {
        this.parent(time);

        log('_selectedIndex=' + this._selectedIndex);

        let selectedMode = this._items[this._selectedIndex]._mode;

        this._dpiHandler._setMode(selectedMode);
    }
});

const DpiSwitcherList = new Lang.Class({
    Name: 'DpiSwitcherList',
    Extends: SwitcherPopup.SwitcherList,

    _init: function(items) {
        this.parent(true);

        let ICON_SIZE = Convenience.getSettings().get_int('icon-size');

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            let box = new St.BoxLayout({ style_class: 'switcher-box',
                                    vertical: true });

            let icon = new St.Icon({ style_class: 'switcher-box-icon', 
                                    icon_name: item._icon,
                                    icon_size: ICON_SIZE});

            let text = new St.Label({ style_class: 'switcher-box-label', 
                                    text: item._name });
            box.add(icon);
            box.add(text);

            this.addItem(box, text);
        }
    }
});

const SwitcherItem = new Lang.Class({
    Name: 'SwitcherItem',
    _init: function(index, name, icon, mode) {
        this._index = index;
        this._name = name;
        this._icon = icon;
        this._mode = mode;
    }
});