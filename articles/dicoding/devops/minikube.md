# `minikube`

```powershell
minikube start
```

```bash
kubectl cluster-info
```

Jangan gunakan bash wsl


```bash
code .
/mnt/c/Program Files/Microsoft VS Code/bin/code: 61: /mnt/c/Program Files/Microsoft VS Code/Code.exe: Exec format error
```

```bash
sudo sh -c 'echo :WSLInterop:M::MZ::/init:PF > /usr/lib/binfmt.d/WSLInterop.conf'
```

```bash
sudo systemctl restart systemd-binfmt
```

```bash
minikube stop
minikube delete
```

minikube start --static


kubectl namespace karsajobs

minikube service karsajobs --url -n karsajobs