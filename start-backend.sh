#!/usr/bin/env zsh

tmux start-server

# create a session with five panes
tmux new-session -d -s StorageSmash -n Zsh -d "/usr/bin/env zsh -c \"echo 'Typescript Compiler'\"; sudo yarn tsc"

tmux split-window -t StorageSmash:0 "/usr/bin/env zsh -c \"echo 'Docker Server'\"; docker-compose up --force-recreate"
tmux split-window -t StorageSmash:0 "/usr/bin/env zsh -c \"echo 'Prisma Studio'\"; yarn prisma studio"

# change layout to tiled
tmux select-layout -t StorageSmash:0 tiled

tmux attach -t StorageSmash
