/*jshint esversion: 6 */
const GLib = imports.gi.GLib;

function _run(command) {
    let result;

    try {
        let [res, out, err, status] = GLib.spawn_command_line_sync(command, null, null, null, null);
        result = {success: res, out: out.toString()};
    } catch (e) {
        result = {success: false, out: "ERROR"};
    }

    return result;
}