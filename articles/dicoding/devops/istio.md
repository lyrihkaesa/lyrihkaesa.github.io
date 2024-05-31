# `istio` and `istioctl`

```bash
minikube start
```

```bash
istioctl install --set profile=demo -y
```

```bash
kubectl label namespace default istio-injection=enabled
```

