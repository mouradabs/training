to set a key:

    node kv.js set --key=KEY --value=VALUE -d /tmp/a

to get a key:

    node kv.js get --key=KEY -d /tmp/a

to sync with another db:

    dupsh 'node kv.js sync -d /tmp/a' \
      'node kv.js sync -d /tmp/b'

to sync over websockets:

    dupsh 'node kv.js sync -d /tmp/a' \
      'wsnc -l 5001'

and then connect a browser to ws://localhost:5001
