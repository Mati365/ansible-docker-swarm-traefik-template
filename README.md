# Vagrant + Ansible + Docker Swarm + Traefik + NGINX template

Template repo that creates virtual machines with Docker, Docker Swarm, Traefik, NGINX. It shows how easy you can create "feature branch" deployment on your VPS

## Installation

Make sure that you have installed `vagrant` with `libvirt` plugin and `ansible`! Generate all env keys to access machine:

```bash
(cd keys/; ./generate-keys.sh)
```

Run vagrant and create vm (do not use `--create-vm` option if you want to only re-run ansible configure).

```bash
./start-dev.sh --create-vm
```

Edit you `/etc/hosts` on local machine and add these entries:

```bash
192.168.56.10 traefik.example.com
192.168.56.10 feature.example.com
```

And it works! You can enter these URLs:

```bash
Login: user
Password: 123456

http://traefik.example.com/dashboard/#/
http://feature.example.com/
```

## Add your public key

Add your public key to `keys/authorized/deploy/` folder and run `./start-dev.sh` to access server via `ssh deploy@192.168.56.10`.

## Deploy new env script

Just run on `deploy@192.168.56.10`:

```bash
/var/www/staging/script/setup.mjs --name="ladybug"
```

and after deployment visit (edit `/etc/hosts` before):

```bash
http://ladybug.example.com/
```

## Firewall

Project uses `iptables`. Find `rules.v4` file to customize firewall.

```bash
nmap -Pn 192.168.56.10

Starting Nmap 7.80 ( https://nmap.org ) at 2022-09-21 15:40 CEST
Nmap scan report for traefik.example.com (192.168.56.10)
Host is up (0.00028s latency).
Not shown: 997 filtered ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 4.75 seconds
```

## Delete

```bash
./start-dev.sh --destroy-vm
```

## License

MIT License

Copyright (c) 2022 Mateusz Bagiński

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
