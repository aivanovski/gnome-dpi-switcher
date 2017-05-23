/*jshint esversion: 6 */

const St = imports.gi.St;
const Main = imports.ui.main;
const Lang = imports.lang;
const CurrentExtension = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = CurrentExtension.imports.convenience;
const CommandLine = CurrentExtension.imports.commandLine;
const UI = CurrentExtension.imports.ui;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Config = imports.misc.config;

const HOT_KEY_SHORTCUT = "key-shortcut-switch-dpi";
const HOT_KEY_META_FLAGS = Meta.KeyBindingFlags.NONE;
const SHELL_VERSION  = Config.PACKAGE_VERSION.split('.')[1];
const HOT_KEY_BINDING_FLAGS  = (SHELL_VERSION <= 14) ? Shell.KeyBindingMode.NORMAL : Shell.ActionMode.NORMAL;

const DPI_LOW = 0;
const DPI_HIGH = 1;

let extension;

const DisplayExtension = new Lang.Class({
    Name: 'DisplayExtension',

    _init: function() {

        this._settings = Convenience._getSettings();
        this._dpiPresenter = new UI.DpiPopupPresenter();
        this._dpiHandler = new DpiHandler();

        Convenience._initTheme();

        this._bindHotKey();
    },

    _bindHotKey: function() {
        Main.wm.addKeybinding(HOT_KEY_SHORTCUT,
            this._settings,
            HOT_KEY_META_FLAGS,
            HOT_KEY_BINDING_FLAGS,
            Lang.bind(this, this._showSwither));
    },

    _unbindHotKey: function() {
        Main.wm.removeKeybinding(HOT_KEY_SHORTCUT);
    },

    _showSwither: function(display, screen, window, binding ) {
        let mode = this._dpiHandler._getCurrentMode();

        log('hot key pressed, mode=' + mode);
        this._dpiPresenter._show(binding.is_reversed(), 
                                        binding.get_name(), 
                                        binding.get_mask()); 
    },

    _destroy: function() {
        this._unbindHotKey();
    }
});

const DpiHandler = new Lang.Class({
    Name: 'DpiHandler',

    _init: function() {
    },

    _getCurrentMode: function() {
        return DPI_LOW;
    },

    _setMode: function(mode) {
    }
});


function init() {
}

function enable() {
    if ( typeof extension === 'undefined' || extension === null ) {
        extension = new DisplayExtension();
    }
}

function disable() {
    if (extension) {
        extension._destroy();
        extension = null;
    }
}
