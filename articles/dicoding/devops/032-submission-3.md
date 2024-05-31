# Submission 3: Proyek Implementasi Asynchronous Communication pada Aplikasi E-Commerce App

> 🌟🌟🌟🌟🌟

## Menambahkan submodule

```bash
git submodule add -b order-service https://github.com/lyrihkaesa/a433-microservices.git order-service
```

```bash
git submodule add -b shipping-service https://github.com/lyrihkaesa/a433-microservices.git shipping-service
```

## Reset `minikube` dan pemasangan `istio`

```bash
minikube stop
minikube delete
minikube start
```

```bash
istioctl install --set profile=demo -y
```

```bash
kubectl create namespace ecommerce
```

```bash
kubectl label namespace ecommerce istio-injection=enabled
```

atau default

```bash
kubectl label namespace default istio-injection=enabled
```
## Menambahkan RabbitMQ ke Kubernetes dengan `helm`

Menambahkan repo ke helm

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Jangan lupa perbarui repo

```bash
helm repo update
```

Cek repo-nya sudah ada belum:

```bash
helm repo list
```

Pasang RabbitMQ dengan namespace ecommerce:

```bash
helm install rabbit --set service.type=NodePort bitnami/rabbitmq --namespace ecommerce
```

username dari RabbitMQ adalah `user`
Dapatkan password RabbitMQ dengan perintah berikut:

```bash
echo $(kubectl get secret --namespace ecommerce rabbit-rabbitmq -o jsonpath="{.data.rabbitmq-password}" | base64 -d)
```

Membuat object kubernetes:

```bash
kubectl apply -f kubernetes/shipping/shipping-service.yaml -n ecommerce
kubectl apply -f kubernetes/shipping/shipping-deployment.yaml -n ecommerce

kubectl apply -f kubernetes/order/order-service.yaml -n ecommerce
kubectl apply -f kubernetes/order/order-deployment.yaml -n ecommerce
```


```bash
kubectl get all -n ecommerce
```

```bash
kubectl get all -n ecommerce -o wide
```

## Menambahkan `istio`

```bash
kubectl apply -f kubernetes/istio/ecommerce-gateway.yaml -n ecommerce
```

```bash
export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

```bash
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
```

```bash
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')
```

```bash
echo "$INGRESS_HOST" "$INGRESS_PORT" "$SECURE_INGRESS_PORT"
```

```bash
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
```

```bash
echo "http://$GATEWAY_URL/order"
```

```bash
kubectl get statefulset.apps/rabbit-rabbitmq -o yaml -n ecommerce
```

```bash
minikube tunnel
```

`POST` http:127.0.0.1/order dengan body:

```json
{
    "order": {
        "book_name": "Harry Potter",
        "author": "J.K Rowling",
        "buyer": "Fikri Helmi Setiawan",
        "shipping_address": "Jl. Batik Kumeli no 50 Bandung"
    }
}
```
