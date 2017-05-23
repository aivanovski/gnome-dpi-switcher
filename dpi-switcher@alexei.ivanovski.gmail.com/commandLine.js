/*jshint esversion: 6 */

function _run(command) {
    let result;

    try {
        let [res, out, err, status] = GLib.spawn_command_line_sync(command, null, null, null, null);
        result = {success: res, callback: out.toString()};
    } catch (e) {
        result = {success: false, callback: "ERROR"};      
    }

    return result;
}