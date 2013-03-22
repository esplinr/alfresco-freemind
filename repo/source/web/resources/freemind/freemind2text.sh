#!/bin/bash
# save arguments to variables
SOURCE=$1
TARGET=$2

# to see what gets extracted append arguments to logfile
echo "from $SOURCE to $TARGET" >>/tmp/freemindtransform.log

# call xmlstarlet tool and redirect output to $TARGET
xmlstarlet sel --text --encoding UTF-8 -t -m //node -v @TEXT -o ' ' "$SOURCE" > "$TARGET"
