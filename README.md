# micro-tickets

##To run this project you need:

- Docker + Kubernetes
- skaffold
- nginx
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/cloud/deploy.yaml
```
- secrets
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=verysecret
```

### to create a JWT_KEY inside cluster:
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=verysecretpinksocks
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_******
```

### for tests:
```
inside payments map create .env file with STRIPE_KEY=sk_test_******
```

### to update common library and get the latest version
```
cd common && npm run pub
cd tickets && npm update @gunit/common --save
```
