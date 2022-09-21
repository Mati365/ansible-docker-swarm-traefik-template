#!/bin/bash

rm -rf ./id_rsa*
ssh-keygen -t rsa -b 4096 -q -P "" -f ./id_rsa
