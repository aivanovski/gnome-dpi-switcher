#!/bin/bash

# Gdk/WindowScalingFactor is ignored because there is no way to read it from gsettings via command

scaling_factor=$(gsettings get org.gnome.desktop.interface scaling-factor | cut -d ' ' -f 2)

if [ "$scaling_factor" == "1" ]; then
    echo "low"
elif [ "$scaling_factor" == "2" ]; then
    echo "high"
fi