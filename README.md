# gnome-dpi-switcher
DPI Switcher provides easy way to change scale factors in GNOME Shell. This extension if useful for multi-monitor setups with different DPI.

## Installation
Just run install.sh from project directory, it will compile schemas and copy sources to gnome extensions directory.
```
git clone https://github.com/chiken88/gnome-dpi-switcher.git
install.sh
```

## Usage
Just press Super + O.

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
