/*jshint esversion: 6 */
const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;
const CurrentExtension = ExtensionUtils.getCurrentExtension();
const Gtk = imports.gi.Gtk;
const Theme = Gtk.IconTheme.get_default();

function _getSettings(schema) {
    schema = schema || CurrentExtension.metadata['settings-schema'];

    const GioSSS = Gio.SettingsSchemaSource;

    let schemaDir = CurrentExtension.dir.get_child('schemas');
    let schemaSource;
    if (schemaDir.query_exists(null)) {
        schemaSource = GioSSS.new_from_directory(schemaDir.get_path(),
                                                 GioSSS.get_default(),
                                                 false);
    } else {
        schemaSource = GioSSS.get_default();
    }

    let schemaObj = schemaSource.lookup(schema, true);
    if (!schemaObj) {
        throw new Error('Schema ' + schema + ' could not be found for extension ' + 
            CurrentExtension.metadata.uuid + '. Please check your installation.');
    }

    return new Gio.Settings({ settings_schema: schemaObj });
}

function _initTheme() {
    Theme.append_search_path(this._getDirPath('icons'));
}

function _getDirPath(relPath) {
    let dir = CurrentExtension.dir.get_child(relPath);
    if (dir.query_exists(null)) {
        return dir.get_path();
    } else {
        throw new Error('Unable to load path: ' + relPath);
    }
}