#!/bin/bash

function set_scale {
    scale=$1

    gsettings set org.gnome.desktop.interface scaling-factor "$scale"
    gsettings set org.gnome.settings-daemon.plugins.xsettings overrides "[{'Gdk/WindowScalingFactor', <$scale>}]"
}

mode=$1

if [ "$mode" == "low" ]; then
    set_scale 1
elif [ "$mode" == "high" ]; then
    set_scale 2
fi