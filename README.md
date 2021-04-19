# gnome-dpi-switcher
DPI Switcher provides easy way to change scale factors in GNOME Shell. This extension is useful for multi-monitor setups with different DPI.

## Installation
Just run install.sh from project directory, it will compile schemas and copy sources to gnome extensions directory.
```
git clone https://github.com/chiken88/gnome-dpi-switcher.git
install.sh
```

## Usage
Just press Super + O.
![alt tag](https://github.com/aivanovski/gnome-dpi-switcher/blob/master/screenshots/demo.png)

## What this extension really does
This extension sets different scale factors through 'gsettings' utility as it listed below.
```
gsettings set org.gnome.desktop.interface scaling-factor "$scale"
gsettings set org.gnome.settings-daemon.plugins.xsettings overrides "[{'Gdk/WindowScalingFactor', <$scale>}]"
```
By default it switches between values 1 and 2 as scale factors. 

## Configuration
For now, extension doesn't have UI with settings. You can configure it manually, by your needs. 

### Scale factors
Extension uses scripts/set_mode.sh to set scale factors, default values is 1 for low DPI and 2 for high DPI displays.
```
...

if [ "$mode" == "low" ]; then
    set_scale 1
elif [ "$mode" == "high" ]; then
    set_scale 2
fi
```

### Hot key
schemas/org.gnome.shell.extensions.dpi-switcher.gschema.xml provides possibility to change hot key, default value is Super + O.
```
...
<key name="key-shortcut-switch-dpi" type="as">
  <default><![CDATA[['<Super>o']]]></default>
</key>
...
```
You'll have to compile schema after any changes or just run install.sh.
```
cd dpi-switcher@alexei.ivanovski.gmail.com
glib-compile-schemas schemas
```

## License

Copyright (C) 2017 Aleksey Ivanovsky

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
